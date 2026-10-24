import type { SectionHeading } from "@/lib/content";

const TableOfContents = ({ headings }: { headings: SectionHeading[] }) => {
	if (headings.length < 2) return null;

	// A single wrapping line of jump links: no click needed, and it stays out of the way.
	return (
		<nav
			aria-label="Table of contents"
			className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-primaryText/80">
			<span className="font-semibold text-primaryaccent">Jump to</span>
			{headings.map(({ id, text }, index) => (
				<span key={id} className="flex items-baseline gap-2">
					{index > 0 && (
						<span aria-hidden="true" className="text-dot">
							·
						</span>
					)}
					<a
						href={`#${id}`}
						className="hover:text-primaryaccent hover:underline">
						{text}
					</a>
				</span>
			))}
		</nav>
	);
};

export default TableOfContents;
