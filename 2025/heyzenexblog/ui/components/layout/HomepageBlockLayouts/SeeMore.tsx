"use client";
import { Button } from "@/components/ui/button";
import ChevronRight from "@/icons/ChevronRight";
import Link from "next/link";

const SeeMore = ({ url }: { url: string }) => {
	return (
		<Link
			href={url}
			className="inline-flex w-fit px-3 py-2 bg-primaryaccent rounded-md text-primarycream hover:bg-primaryaccent">
			See More
		</Link>
	);
};

export default SeeMore;
