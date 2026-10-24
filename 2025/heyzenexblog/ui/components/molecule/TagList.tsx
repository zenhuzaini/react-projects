import Link from "next/link";
import Chip from "@/components/ui/chip";
import { tagSlug } from "@/lib/slug";

const TagList = ({ tags }: { tags: string[] }) => {
	if (!tags.length) return null;

	return (
		<div className="mt-6 flex flex-col gap-2">
			<span className="flex justify-start text-sm font-medium text-primaryText md:justify-center">
				Tags:{" "}
			</span>
			<ul className="flex flex-wrap justify-start gap-2 md:justify-center">
				{tags.map((tag) => (
					<li key={tag}>
						<Link
							href={`/tags/${tagSlug(tag)}`}
							className="block transition-transform duration-300 hover:-translate-y-0.5">
							<Chip text={tag} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TagList;
