import { faker } from "@faker-js/faker";
import MainStoryBookPage from "@/components/layout/StoryBookBlockLayouts/MainStoryBookPage";

const Story = async ({ params }: { params: Promise<{ id: string }> }) => {
	const photoUrls = Array.from({ length: 8 }, () => faker.image.url());
	const { id } = await params;

	const createdAt = faker.date.anytime().toLocaleDateString("en-GB", {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
	const storyCover = faker.image.url();
	const storyTitle = faker.lorem.sentence(4);
	const storyDescription = faker.lorem.paragraphs(1);
	const storyPhotoUrls = Array.from({ length: 8 }).map(() => faker.image.url());
	const storyContent = Array.from({ length: 5 }).map(() => ({
		type: "paragraph",
		content: [{ type: "text", text: faker.lorem.sentences(3) }],
	}));

	return (
		<MainStoryBookPage
			createdAt={createdAt}
			storyCover={storyCover}
			storyId={id}
			storyTitle={storyTitle}
			storyDescription={storyDescription}
			storyPhotoUrls={storyPhotoUrls}
			storyContent={storyContent}
		/>
	);
};

export default Story;
