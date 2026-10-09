const SectionTitle = ({ text }: { text: string }) => {
	return (
		<div className="flex w-full flex-col gap-3">
			<h2 className="text-2xl font-semibold leading-tight text-primaryText sm:text-3xl">
				{text}
				<span className="text-dot">.</span>
			</h2>
			<div aria-hidden="true" className="flex w-full items-center gap-3">
				<span className="h-1.5 w-12 shrink-0 rounded-full bg-primaryaccent" />
				<span className="h-px flex-1 bg-primaryaccent/25" />
			</div>
		</div>
	);
};

export default SectionTitle;
