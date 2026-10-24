import Link from "next/link";
import { animationForLift } from "@/animation/animation";
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
							className={`block ${animationForLift}`}>
							<Chip text={tag} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TagList;
