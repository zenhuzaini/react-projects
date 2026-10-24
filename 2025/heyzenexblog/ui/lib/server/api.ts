import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const errorResponse = (
	error: string,
	status: number,
	headers?: HeadersInit,
) => NextResponse.json({ error }, { status, headers });

const secretMatches = (provided: string, expected: string) => {
	const providedBuffer = Buffer.from(provided);
	const expectedBuffer = Buffer.from(expected);
	return (
		providedBuffer.length === expectedBuffer.length &&
		timingSafeEqual(providedBuffer, expectedBuffer)
	);
};

export const clientIp = (request: Request) =>
	request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

// In-memory sliding window. Each server instance counts separately, so this slows
// abuse down but is not a hard global limit; use an edge/WAF limit for that.
const hits = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5_000;

export function rateLimit(key: string, limit: number, windowMs: number) {
	const now = Date.now();
	const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);

	if (recent.length >= limit) {
		hits.set(key, recent);
		return {
			ok: false,
			retryAfterSeconds: Math.ceil((recent[0] + windowMs - now) / 1000),
		};
	}

	recent.push(now);
	hits.set(key, recent);

	if (hits.size > MAX_TRACKED_KEYS) {
		for (const [trackedKey, times] of hits) {
			if (times.every((time) => now - time >= windowMs)) hits.delete(trackedKey);
		}
	}
	return { ok: true, retryAfterSeconds: 0 };
}

export const tooManyRequests = (retryAfterSeconds: number) =>
	errorResponse("Too many requests. Try again later.", 429, {
		"Retry-After": String(Math.max(1, retryAfterSeconds)),
	});

// Rejects early when the declared body is too large, before it is buffered.
export function rejectOversizedBody(request: Request, maxBytes: number) {
	const declared = Number(request.headers.get("content-length"));
	return Number.isFinite(declared) && declared > maxBytes
		? errorResponse("Request body is too large.", 413)
		: null;
}

const FAILED_AUTH_LIMIT = 5;
const FAILED_AUTH_WINDOW_MS = 15 * 60 * 1000;

// Returns an error response, or null when the publisher key is valid.
export function authorizePublisher(request: Request, expectedSecret: string) {
	if (expectedSecret.length < 32) {
		return errorResponse("PUBLISH_SECRET must be at least 32 characters.", 503);
	}

	const ip = clientIp(request);
	const failureKey = `auth-fail:${ip}`;
	const supplied = request.headers.get("x-publish-secret") ?? "";

	if (secretMatches(supplied, expectedSecret)) return null;

	const attempt = rateLimit(failureKey, FAILED_AUTH_LIMIT, FAILED_AUTH_WINDOW_MS);
	return attempt.ok
		? errorResponse("Invalid publisher key.", 401)
		: tooManyRequests(attempt.retryAfterSeconds);
}
