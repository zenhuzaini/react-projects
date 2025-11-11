import { faker } from "@faker-js/faker";

import fs from "fs";
import path from "path";

const baseContent = (index: number, slug: string) => {
	const bookName = faker.book.title();
	const cover = faker.image.url();
	const fullDescription = faker.lorem.sentence({ min: 8, max: 20 });
	const description = fullDescription.split(" ").slice(0, 10).join(" ");
	const photoExample = faker.image.url();
	const date = faker.date.anytime();
	const modifiedDate = faker.date.anytime();
	const eventDateTo = faker.date.anytime();
	const eventDateFrom = faker.date.anytime();
	const tags = `["${faker.word.words({ count: 1 })}","${faker.word.words({
		count: 1,
	})}", "${faker.word.words({
		count: 1,
	})}","${faker.word.words({ count: 1 })}"]`;
	const city = faker.location.city();
	const country = faker.location.country();
	const like = faker.number.int({ min: 50, max: 100 });
	const view = faker.number.int({ min: 100, max: 400 });

	return `export const metadata = {
	slug: "${index}-${slug}",
	title: "${bookName}",
	id: ${index},
	views: ${view},
	likes: ${like},
	cover:
		"${cover}",
	description: "${description}",
	datePublished: "${date}",
	dateModified: "${modifiedDate}",
	eventDateTo: "${eventDateTo}",
	eventDateFrom: "${eventDateFrom}",
	tags: ${tags},
	city: "${city}",
	country: "${country}"
};

export const photoexample = {
	photoUrl: "${photoExample}",
	description:
		"Tergiversatio alioqui optio contego carcer repellendus itaque copiose celebrer id",
};

export const photoExamples = [
	{
		photoUrl: "https://picsum.photos/seed/A1B2C3D4/1907/1577",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
	},
	{
		photoUrl: "https://picsum.photos/seed/E5F6G7H8/1907/1577",
		description:
			"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
	},
	{
		photoUrl: "https://picsum.photos/seed/I9J0K1L2/1907/1577",
		description:
			"Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
	},
	{
		photoUrl: "https://picsum.photos/seed/M3N4O5P6/1907/1577",
		description:
			"Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
	},
	{
		photoUrl: "https://picsum.photos/seed/Q7R8S9T0/1907/1577",
		description:
			"Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis.",
	},
	{
		photoUrl: "https://picsum.photos/seed/U1V2W3X4/1907/1577",
		description: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
	},
	{
		photoUrl: "https://picsum.photos/seed/Y5Z6A7B8/1907/1577",
		description:
			"Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
	},
	{
		photoUrl: "https://picsum.photos/seed/C9D0E1F2/1907/1577",
		description:
			"Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet quam id dui posuere.",
	},
];

<Pho photo={photoExamples[0]} />

This is some **bold** and _italics_ text.

This is a list in markdown:

- One
- Two
- Three

Checkout my React component:

<Par
	text="whatever happens to this pharagraph will always stay in the paragraph. I like
	this because I can write whatever I want in here"
/>

<Phopha text={"whatever it is it has to like work!"} photo={photoexample} />

<Phapho
	text={
		"this is the photo of thaddeus . the betrayer. He is also known as the long lover"
	}
	photo={photoexample}
/>

<Quo
	text="whatever happens to this pharagraph will always stay in the paragraph. I like
	this because I can write whatever I want in here"
/>
<Phapho text={"whatever it is it has to like work!"} photo={photoexample} />

<PhoCol photo={photoExamples} />
`;
};

const outputDir = path.join(process.cwd(), "contents", "mystorybook");
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

for (let i = 1; i <= 25; i++) {
	const slug = faker.lorem.slug(5);
	const content = baseContent(i, slug);
	const filename = `${slug}.mdx`;
	fs.writeFileSync(path.join(outputDir, filename), content, "utf8");
	console.log(`Generated ${filename}`);
}
