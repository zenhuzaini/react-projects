const Heading = ({
	title = "Story builder",
	description = "Arrange story blocks, save drafts in this browser, and export a ready-to-edit MDX file.",
}: {
	title: string;
	description: string;
}) => (
	<section aria-labelledby="story-builder-heading" className="min-w-0 flex-1 ">
		<h1
			id="story-builder-heading"
			className="text-3xl font-extrabold text-primaryaccent sm:text-4xl">
			{title}
		</h1>
		<p className="text-sm text-primaryText">{description}</p>
	</section>
);

export default Heading;
