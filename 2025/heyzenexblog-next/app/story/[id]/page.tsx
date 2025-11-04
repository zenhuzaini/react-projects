import UnderDevelopment from "@/components/layout/UnderDevelopment";

const Story = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	return (
		<div>
			<UnderDevelopment></UnderDevelopment>
		</div>
	);
};

export default Story;
