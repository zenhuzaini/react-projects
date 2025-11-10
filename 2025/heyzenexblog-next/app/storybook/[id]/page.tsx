"use cache";
import { faker } from "@faker-js/faker";
import MainStoryBookPage from "@/components/layout/StoryBookBlockLayouts/MainStoryBookPage";
import { photoMock } from "@/mock/photo";
import { storyContentsMock } from "@/mock/storyContent";

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
	const storyPhotoUrls = photoMock({ length: 8 });
	const storyContent = storyContentsMock;
	const totalLike = 17;
	const totalView = 200;

	return (
		<MainStoryBookPage
			totalLike={totalLike}
			totalView={totalView}
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
