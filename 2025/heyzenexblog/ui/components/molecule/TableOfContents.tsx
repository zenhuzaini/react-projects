import type { SectionHeading } from "@/lib/content";

const TableOfContents = ({ headings }: { headings: SectionHeading[] }) => {
	if (headings.length < 2) return null;

	return (
		<nav
			aria-label="Table of contents"
			className="rounded-2xl border border-primaryaccent p-4">
			<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primaryaccent">
				In this story
			</p>
			<ol className="flex list-decimal flex-col gap-1 pl-5 text-primaryText">
				{headings.map(({ id, text }) => (
					<li key={id}>
						<a href={`#${id}`} className="hover:underline">
							{text}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default TableOfContents;
