export const ACCENT_STORAGE_KEY = "accent-colors";

export const DEFAULT_ACCENTS = {
	light: "#634f40",
	dark: "#786cd5",
};

export type AccentColors = typeof DEFAULT_ACCENTS;

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

export function readAccents(): AccentColors {
	try {
		const parsed = JSON.parse(localStorage.getItem(ACCENT_STORAGE_KEY) ?? "{}");
		return {
			light: HEX_COLOR.test(parsed.light)
				? parsed.light
				: DEFAULT_ACCENTS.light,
			dark: HEX_COLOR.test(parsed.dark) ? parsed.dark : DEFAULT_ACCENTS.dark,
		};
	} catch {
		return DEFAULT_ACCENTS;
	}
}

export function saveAccents(accents: AccentColors) {
	localStorage.setItem(ACCENT_STORAGE_KEY, JSON.stringify(accents));
}

export function clearAccents() {
	localStorage.removeItem(ACCENT_STORAGE_KEY);
}

// Injected as a late stylesheet so it beats the :root and .dark rules in globals.css.
export function applyAccents(accents: AccentColors) {
	const id = "accent-overrides";
	let style = document.getElementById(id);
	if (!style) {
		style = document.createElement("style");
		style.id = id;
		document.head.appendChild(style);
	}
	style.textContent = `html:not(.dark){--color-primaryaccent:${accents.light}}html.dark{--color-primaryaccent:${accents.dark}}`;
}
