const startsWith = (bytes: Uint8Array, signature: number[], offset = 0) =>
	signature.every((byte, index) => bytes[offset + index] === byte);

const ascii = (bytes: Uint8Array, start: number, end: number) =>
	String.fromCharCode(...bytes.slice(start, end));

// Identifies an image from its first bytes; the browser-supplied MIME type is not trusted.
export function sniffImageType(bytes: Uint8Array): string | null {
	if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "image/jpeg";
	if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
		return "image/png";
	}
	if (ascii(bytes, 0, 6) === "GIF87a" || ascii(bytes, 0, 6) === "GIF89a") {
		return "image/gif";
	}
	if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 12) === "WEBP") {
		return "image/webp";
	}
	if (ascii(bytes, 4, 8) === "ftyp") {
		const brand = ascii(bytes, 8, 12);
		if (brand === "avif" || brand === "avis") return "image/avif";
	}
	return null;
}
