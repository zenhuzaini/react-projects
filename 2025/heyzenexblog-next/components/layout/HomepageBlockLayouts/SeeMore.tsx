import ChevronRight from "@/icons/ChevronRight";
import Link from "next/link";

const SeeMore = ({ url }: { url: string }) => {
	return (
		<div className="flex w-fit px-3 py-2 bg-primaryaccent rounded-md">
			<Link href={url}>
				<span className="text-primarycream font-medium">See more</span>
			</Link>
		</div>
	);
};

export default SeeMore;
