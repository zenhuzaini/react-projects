import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Mountains from "@/icons/Mountains";
import type { Post } from "@/lib/posts";

const SeriesNav = ({
	series,
	posts,
	currentSlug,
}: {
	series?: string;
	posts: Post[];
	currentSlug: string;
}) => {
	if (!series || posts.length < 2) return null;

	const position = posts.findIndex((post) => post.slug === currentSlug) + 1;

	// Collapsed by default so it reads as a quiet note instead of a second heading block.
	return (
		<nav
			aria-label={`${series} series`}
			className="flex items-start gap-3 text-sm text-primaryText/80">
			<Mountains size={6} className="mt-1 shrink-0 text-primaryText" />
			<Collapsible className="min-w-0 border-l-2 rounded-xs border-dot pl-3">
				<CollapsibleTrigger className="group flex cursor-pointer items-center gap-2 py-1 text-left">
					<span>
						<span className="font-semibold text-primaryaccent">{series}</span>
						{" · "}
						{position > 0 ? `Part ${position} of ${posts.length}` : "Series"}
					</span>
					<ChevronDown
						size={14}
						aria-hidden="true"
						className="transition-transform group-data-panel-open:rotate-180"
					/>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<ol className="mt-1 flex list-decimal flex-col gap-1 pb-1 pl-5">
						{posts.map((post) => (
							<li key={post.slug}>
								{post.slug === currentSlug ? (
									<span aria-current="page" className="font-semibold">
										{post.title}
									</span>
								) : (
									<Link href={post.href} className="hover:underline">
										{post.title}
									</Link>
								)}
							</li>
						))}
					</ol>
				</CollapsibleContent>
			</Collapsible>
		</nav>
	);
};

export default SeriesNav;
