import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
	authorizePublisher,
	clientIp,
	errorResponse,
	rateLimit,
	rejectOversizedBody,
	tooManyRequests,
} from "@/lib/server/api";
import { sniffImageType } from "@/lib/server/imageSniff";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const UPLOADS_PER_MINUTE = 20;
const IMAGE_QUALITY_MODES = new Set(["auto:eco", "auto:good", "auto:best"]);
const ALLOWED_IMAGE_TYPES = new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif",
	"image/gif",
]);

export async function POST(request: Request) {
	const publisherSecret = process.env.PUBLISH_SECRET;
	const cloudinaryUrlValue = process.env.CLOUDINARY_URL;
	if (!publisherSecret || !cloudinaryUrlValue) {
		return errorResponse(
			"Image uploads are not configured. Set PUBLISH_SECRET and CLOUDINARY_URL on the server.",
			503,
		);
	}

	const authFailure = authorizePublisher(request, publisherSecret);
	if (authFailure) return authFailure;

	const limit = rateLimit(
		`upload:${clientIp(request)}`,
		UPLOADS_PER_MINUTE,
		60_000,
	);
	if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

	// Form fields add a little on top of the file itself.
	const oversized = rejectOversizedBody(request, MAX_IMAGE_SIZE + 64 * 1024);
	if (oversized) return oversized;

	let cloudinaryUrl: URL;
	try {
		cloudinaryUrl = new URL(cloudinaryUrlValue);
	} catch {
		return errorResponse("CLOUDINARY_URL is invalid.", 503);
	}
	if (
		cloudinaryUrl.protocol !== "cloudinary:" ||
		!cloudinaryUrl.hostname ||
		!cloudinaryUrl.username ||
		!cloudinaryUrl.password
	) {
		return errorResponse("CLOUDINARY_URL is invalid.", 503);
	}

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return errorResponse("Upload must use multipart form data.", 400);
	}

	const file = form.get("file");
	const requestedQuality = form.get("quality");
	const quality = requestedQuality ?? "auto:good";
	if (!(file instanceof File)) {
		return errorResponse("Select an image file to upload.", 400);
	}
	if (typeof quality !== "string" || !IMAGE_QUALITY_MODES.has(quality)) {
		return errorResponse("Image quality option is invalid.", 400);
	}
	if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
		return errorResponse("Use a JPG, PNG, WebP, AVIF, or GIF image.", 415);
	}
	if (file.size === 0 || file.size > MAX_IMAGE_SIZE) {
		return errorResponse("Images must be between 1 byte and 10 MB.", 413);
	}

	// The declared MIME type comes from the client, so confirm it against the file's bytes.
	const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
	if (sniffImageType(header) !== file.type) {
		return errorResponse("The file contents do not match its image type.", 415);
	}

	const timestamp = Math.floor(Date.now() / 1000).toString();
	const folder = "heyzenex/stories";
	const publicId = randomUUID();
	const transformation = `q_${quality}`;
	const signedParameters = {
		folder,
		public_id: publicId,
		timestamp,
		transformation,
	};
	const signatureSource = Object.entries(signedParameters)
		.sort(([left], [right]) => left.localeCompare(right))
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
	const signature = createHash("sha1")
		.update(`${signatureSource}${cloudinaryUrl.password}`)
		.digest("hex");
	const uploadForm = new FormData();
	uploadForm.set("file", file);
	uploadForm.set("api_key", decodeURIComponent(cloudinaryUrl.username));
	uploadForm.set("timestamp", timestamp);
	uploadForm.set("folder", folder);
	uploadForm.set("public_id", publicId);
	uploadForm.set("transformation", transformation);
	uploadForm.set("signature", signature);

	try {
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudinaryUrl.hostname)}/image/upload`,
			{ method: "POST", body: uploadForm, cache: "no-store" },
		);
		const result = (await response.json().catch(() => ({}))) as {
			secure_url?: unknown;
			public_id?: unknown;
		};
		if (!response.ok || typeof result.secure_url !== "string") {
			return errorResponse("Cloudinary could not upload this image.", 502);
		}
		const optimizedUrl = new URL(result.secure_url);
		const uploadPath = "/image/upload/";
		if (!optimizedUrl.pathname.includes(uploadPath)) {
			return errorResponse("Cloudinary returned an invalid image URL.", 502);
		}
		optimizedUrl.pathname = optimizedUrl.pathname.replace(
			uploadPath,
			`${uploadPath}f_auto/`,
		);

		return NextResponse.json({
			url: optimizedUrl.toString(),
			publicId:
				typeof result.public_id === "string" ? result.public_id : publicId,
		});
	} catch {
		return errorResponse("Could not connect to Cloudinary.", 502);
	}
}
