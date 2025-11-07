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
			<DialogContent className=" bg-mybackground border-0 [&>button]:text-primarytextInvert p-3">
				<DialogHeader className="gap-[5%]">
					<DialogTitle className="text-primarytextInvert">
						Some photo
					</DialogTitle>
					<div className="h-[60vh] w-full">
						<ImageWithSkeleton src={src}></ImageWithSkeleton>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
