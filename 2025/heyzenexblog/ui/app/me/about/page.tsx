import Link from "next/link";
import Paragraph from "@/components/layout/StoryBookBlockLayouts/2_BasicPharagraph/Paragraph";

const interests = [
	"Stargazing",
	"Hiking",
	"Bikepacking",
	"Mountains",
	"Photography",
	"Travel",
];

const page = () => {
	return (
		<div className="mx-auto flex max-w-3xl flex-col gap-8 py-6 sm:py-10">
			<header className="flex flex-col gap-3">
				<p className="text-sm uppercase tracking-widest text-primaryviolet">
					About me
				</p>
				<h1 className="text-3xl font-semibold text-primaryText sm:text-5xl">
					Hi, I&apos;m Zen.
				</h1>
				<p className="text-lg font-light text-primaryText/80 sm:text-xl">
					A sky watcher, hiker and cyclist who loves getting a little lost.
				</p>
			</header>

			<ul className="flex flex-wrap gap-2" aria-label="Interests">
				{interests.map((interest) => (
					<li
						key={interest}
						className="rounded-lg bg-primaryviolet px-3 py-1 text-sm text-white">
						<span className="text-primaryyellow">#</span>
						{interest.toLowerCase()}
					</li>
				))}
			</ul>

			<section className="flex flex-col gap-5">
				<Paragraph text="Since I was a kid, I’ve loved looking at the sky for hours in the fields near my grandma’s house, watching clouds and hoping to see something cool. The night sky is my favorite, especially if I spot a shooting star." />
				<Paragraph text="I like hiking in the mountains and cycling on quiet roads through forests and hills, enjoying nature and the adventure that comes with getting a little lost. Sometimes it feels like I’m meant to be a traveler or live somewhere wild, far from the city—maybe even like Tarzan! But that’s tough these days." />
			</section>

			<section className="flex flex-col gap-3 border-l-4 border-primaryviolet pl-4">
				<h2 className="text-xl font-semibold text-primaryText">
					Why this blog
				</h2>
				<Paragraph text="This blog is here for me to share experiences and random thoughts. It’s meant to be a little diary or record of my life, and maybe it will help someone out there. I don’t expect many readers, since most people watch YouTube these days—but you can follow my channel too!" />
			</section>

			<nav className="flex flex-wrap gap-3" aria-label="Explore the blog">
				<Link
					href="/storybook"
					className="rounded-2xl bg-accentbackground px-5 py-2 text-accenttext transition-transform duration-300 hover:-translate-y-0.5">
					Read the stories
				</Link>
				<Link
					href="/photobook"
					className="rounded-2xl border border-primaryviolet px-5 py-2 text-primaryText transition-transform duration-300 hover:-translate-y-0.5">
					Browse the photos
				</Link>
			</nav>
		</div>
	);
};

export default page;
