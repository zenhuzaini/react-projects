import Image from "next/image";
import Link from "next/link";
import Paragraph from "@/components/layout/StoryBookBlockLayouts/2_BasicPharagraph/Paragraph";

const ABOUT_IMAGE =
	"https://res.cloudinary.com/djufavji1/image/upload/v1762553883/IMG_0139_Original_bu30wv.jpg";

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
			<header className="flex flex-row items-center gap-4 sm:gap-10">
				<div className="relative aspect-4/5 w-36 shrink-0 sm:w-52">
					<div
						aria-hidden="true"
						className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-primaryaccent/60"
					/>
					<Image
						src={ABOUT_IMAGE}
						alt="Portrait of Zen"
						fill
						priority
						sizes="(min-width: 640px) 208px, 144px"
						className="relative rounded-3xl object-cover shadow-lg"
					/>
				</div>
				<div className="flex min-w-0 flex-col gap-1 text-left sm:gap-3">
					<p className="text-xs uppercase tracking-widest text-primaryaccent sm:text-sm">
						About me
					</p>
					<h1 className="text-2xl font-semibold text-primaryText sm:text-5xl">
						Hi, I&apos;m Zen.
					</h1>
					<p className="text-sm font-light text-primaryText/80 sm:text-xl">
						A sky watcher, hiker and cyclist who loves getting a little lost.
					</p>
				</div>
			</header>

			<ul className="flex flex-wrap gap-2" aria-label="Interests">
				{interests.map((interest) => (
					<li
						key={interest}
						className="rounded-lg bg-primaryaccent px-3 py-1 text-sm text-white">
						<span className="text-primaryyellow">#</span>
						{interest.toLowerCase()}
					</li>
				))}
			</ul>

			<section className="flex flex-col gap-5">
				<Paragraph text="Since I was a kid, I’ve loved looking at the sky for hours in the fields near my grandma’s house, watching clouds and hoping to see something cool. The night sky is my favorite, especially if I spot a shooting star." />
				<Paragraph text="I like hiking in the mountains and cycling on quiet roads through forests and hills, enjoying nature and the adventure that comes with getting a little lost. Sometimes it feels like I’m meant to be a traveler or live somewhere wild, far from the city—maybe even like Tarzan! But that’s tough these days." />
			</section>

			<section className="flex flex-col gap-3 border-l-4 border-primaryyellow pl-4">
				<h2 className="text-xl font-semibold text-primaryText">
					Why this blog
				</h2>
				<Paragraph text="This blog is here for me to share experiences and random thoughts. It’s meant to be a little diary or record of my life, and maybe it will help someone out there. I don’t expect many readers, since most people watch YouTube these days—but you can follow my channel too!" />
			</section>

			<nav className="flex flex-wrap gap-3" aria-label="Explore the blog">
				<Link
					href="/storybook"
					className="rounded-2xl bg-accentbackground px-5 py-2 text-accenttext transition-transform duration-300 hover:-translate-y-0.5">
					Read my stories
				</Link>
				<Link
					href="/photobook"
					className="rounded-2xl border border-primaryyellow px-5 py-2 text-primaryText transition-transform duration-300 hover:-translate-y-0.5">
					Check my photos
				</Link>
			</nav>
		</div>
	);
};

export default page;
