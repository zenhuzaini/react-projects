"use client";

import { useEffect, useState } from "react";
import {
	AccentColors,
	DEFAULT_ACCENTS,
	applyAccents,
	clearAccents,
	readAccents,
	saveAccents,
} from "@/lib/accent";

const FIELDS: { key: keyof AccentColors; label: string; hint: string }[] = [
	{
		key: "light",
		label: "Light mode accent",
		hint: "Used on the cream background",
	},
	{
		key: "dark",
		label: "Dark mode accent",
		hint: "Used on the dark background",
	},
];

const AccentSettings = () => {
	const [accents, setAccents] = useState<AccentColors>(DEFAULT_ACCENTS);

	useEffect(() => {
		setAccents(readAccents());
	}, []);

	const update = (key: keyof AccentColors, value: string) => {
		const next = { ...accents, [key]: value };
		setAccents(next);
		applyAccents(next);
		saveAccents(next);
	};

	const reset = () => {
		setAccents(DEFAULT_ACCENTS);
		applyAccents(DEFAULT_ACCENTS);
		clearAccents();
	};

	return (
		<div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-6 sm:py-10">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-extrabold text-primaryaccent sm:text-4xl">
					Settings
				</h1>
				<p className="text-primaryText/80">
					Pick the accent color for each theme. Changes apply instantly and are
					saved in this browser.
				</p>
			</header>

			<div className="flex flex-col gap-4">
				{FIELDS.map(({ key, label, hint }) => (
					<label
						key={key}
						className="flex items-center justify-between gap-4 rounded-2xl border border-primaryaccent p-4">
						<span className="flex flex-col">
							<span className="font-semibold text-primaryText">{label}</span>
							<span className="text-sm text-primaryText/70">{hint}</span>
						</span>
						<span className="flex items-center gap-3">
							<span className="font-mono text-sm text-primaryText">
								{accents[key]}
							</span>
							<input
								type="color"
								value={accents[key]}
								onChange={(e) => update(key, e.target.value)}
								aria-label={label}
								className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent p-0"
							/>
						</span>
					</label>
				))}
			</div>

			<section className="flex flex-col gap-3" aria-label="Preview">
				<h2 className="text-xl font-semibold text-primaryText">Preview</h2>
				<div className="flex flex-wrap items-center gap-3">
					<span className="rounded-md bg-primaryaccent px-3 py-2 text-white">
						Button
					</span>
					<span className="rounded-lg bg-primaryaccent px-3 py-1 text-sm text-white">
						#tag
					</span>
					<span className="font-extrabold text-primaryaccent">Heading</span>
					<span className="h-1.5 w-24 rounded-full bg-primaryaccent" />
				</div>
			</section>

			<button
				type="button"
				onClick={reset}
				className="w-fit rounded-2xl border border-primaryaccent px-5 py-2 text-primaryText">
				Reset to defaults
			</button>
		</div>
	);
};

export default AccentSettings;
