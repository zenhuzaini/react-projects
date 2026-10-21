"use client";

import { useEffect, useRef } from "react";
import { TEXT } from "@/const/text";

type DisqusPageContext = {
	page: {
		url: string;
		identifier: string;
		title: string;
	};
};

type DisqusConfig = (this: DisqusPageContext) => void;

declare global {
	interface Window {
		DISQUS?: {
			reset: (options: { reload: true; config: DisqusConfig }) => void;
		};
		disqus_config?: DisqusConfig;
	}
}

const DisqusComments = ({
	identifier,
	title,
}: {
	identifier: string;
	title: string;
}) => {
	const threadRef = useRef<HTMLDivElement>(null);
	const shortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME?.trim();

	const isValidShortname = Boolean(shortname && /^[a-z\d-]+$/i.test(shortname));

	useEffect(() => {
		if (!shortname || !isValidShortname || !threadRef.current) return;

		const config: DisqusConfig = function () {
			this.page.url = window.location.href.split("#")[0];
			this.page.identifier = identifier;
			this.page.title = title;
		};

		window.disqus_config = config;

		if (window.DISQUS) {
			window.DISQUS.reset({ reload: true, config });
			return;
		}

		// If the script is already loading, it picks up window.disqus_config when it runs.
		if (document.getElementById("disqus-embed")) return;

		const script = document.createElement("script");
		script.id = "disqus-embed";
		script.src = `https://${shortname}.disqus.com/embed.js`;
		script.async = true;
		script.setAttribute("data-timestamp", String(Date.now()));
		document.body.appendChild(script);
	}, [identifier, isValidShortname, shortname, title]);

	if (!isValidShortname) return null;

	return (
		<section
			aria-labelledby="comments-heading"
			className="mt-8 border-t border-primaryaccent pt-6">
			<h2
				id="comments-heading"
				className="mb-4 text-xl font-semibold text-primaryText">
				{TEXT.common.commentsHeading}
			</h2>
			<div className="bg-primarycream p-4 rounded-2xl ">
				<div id="disqus_thread" ref={threadRef} />
			</div>
		</section>
	);
};

export default DisqusComments;
