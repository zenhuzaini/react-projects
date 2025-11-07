import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"; // adjust import path
import { ImageWithSkeleton } from "../ImageWithSkeleton";

export default function PhotoDialog({
	src,
	alt,
	open,
	onOpenChange,
}: {
	src: string;
	alt?: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className=" bg-transparent border-0 [&>button]:text-primarytextInvert p-0">
				<DialogHeader className="">
					<DialogTitle className="text-primarytextInvert"></DialogTitle>
					<div className="h-[50vh] w-full">
						<ImageWithSkeleton src={src}></ImageWithSkeleton>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
