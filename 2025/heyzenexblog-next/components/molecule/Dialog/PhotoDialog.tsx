import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"; // adjust import path
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import XMark from "@/icons/XMark";
import { Button } from "@/components/ui/button";

export default function PhotoDialog({
	src,
	alt,
	open,
	onOpenChange,
	fadeSpeed,
}: {
	src: string;
	alt?: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	fadeSpeed?: "slow" | "medium" | "fast";
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className=" bg-transparent border-0 [&>button]:text-primarytextInvert p-0 [&>button]:hidden">
				<DialogHeader className="">
					<DialogTitle className="text-primarytextInvert"></DialogTitle>
					<DialogDescription></DialogDescription>
					<Button
						onClick={() => onOpenChange(false)}
						variant="secondary"
						size="icon"
						className="absolute bg-mybackground  top-4 right-0 z-30 text-primarytextInvert hover:bg-primaryaccent"
						aria-label="Close">
						<XMark className="stroke-primaryText "></XMark>
					</Button>
					<div className="h-[50vh] w-full">
						<ImageWithSkeleton
							fadeSpeed={fadeSpeed}
							src={src}></ImageWithSkeleton>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
