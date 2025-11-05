import UnderDevelopment from "@/components/layout/UnderDevelopment";
import { Separator } from "@/components/ui/separator";

const Story = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return (
		<div>
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="flex flex-col text-xs sm:text-sm">
						<p className="font-extralight">Story Entry</p>
						<p className=" text-[8px] tracking-tight">22 Jan 2025</p>
					</div>
					<div className="bg-mybackgroundinvert w-fit h-[30px] p-2 flex justify-center items-center rounded">
						<h3 className="text-primarycream font-extrabold">
							<span className="text-dot">#</span>1
						</h3>
					</div>
				</div>
				<Separator></Separator>
			</div>
		</div>
	);
};

export default Story;
