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
			<DialogContent
				className="
						bg-transparent border-0 p-0 shadow-none
						flex items-center justify-center
						w-auto max-w-[95vw]
						h-auto max-h-[80vh] sm:max-h-[95vh]
						fixed left-1/2 top-1/2
						-translate-x-1/2 -translate-y-1/2

						duration-300
						data-[state=open]:animate-in
						data-[state=closed]:animate-out
						data-[state=closed]:fade-out-0
						data-[state=open]:fade-in-0
						data-[state=closed]:zoom-out-95
						data-[state=open]:zoom-in-95

						will-change-transform
						transform-gpu

						[&>button]:hidden
					">
				<div className="relative flex items-center justify-center">
					<DialogTitle className="text-primarytextInvert"></DialogTitle>
					<DialogDescription></DialogDescription>
					<Button
						onClick={() => onOpenChange(false)}
						variant="secondary"
						size="icon"
						className="absolute bg-mybackground  top-0 right-0 z-30 text-primarytextInvert hover:bg-primaryaccent"
						aria-label="Close">
						<XMark className="stroke-primaryText "></XMark>
					</Button>
					<div className="absolute bottom-1 right-5 z-30 ">
						<h2 className=" text-accenttext">
							photo by heyzenex
							<span className="text-dot">.</span>
						</h2>
					</div>
					<div className="flex items-center justify-center max-h-[90vh] max-w-[90vw]">
						<ImageWithSkeleton
							customClassName={
								"block w-auto h-auto max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
							}
							fill={false}
							fadeSpeed={fadeSpeed}
							src={src}></ImageWithSkeleton>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
