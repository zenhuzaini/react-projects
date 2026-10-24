import Link from "next/link";
import StatusPage from "@/components/layout/OtherLayouts/StatusPage";
import { createBaseMetadata } from "@/lib/seo";

export const metadata = createBaseMetadata({
	title: "Page not found",
	description: "The page you are looking for does not exist.",
	robotsIndex: false,
});

const NOT_FOUND_IMAGE =
	"https://d2exd72xrrp1s7.cloudfront.net/www/mg/mg4yirah2keerlrsk5mnrgyc51zde24p-p483699884-full/190d222bc58?width=1920&crop=false&q=70";

const NotFound = () => (
	<StatusPage
		imageSrc={NOT_FOUND_IMAGE}
		imageAlt="Green tent in the middle of the forest"
		title="404.."
		actions={
			<>
				<Link
					href="/storybook"
					className="rounded-2xl bg-primaryaccent px-5 py-2 text-base font-normal tracking-normal text-accenttext transition-transform duration-300 hover:-translate-y-0.5">
					Read my stories
				</Link>
				<Link
					href="/photobook"
					className="rounded-2xl border border-primaryaccent px-5 py-2 text-base font-normal tracking-normal text-primaryText transition-transform duration-300 hover:-translate-y-0.5">
					Check my photos
				</Link>
			</>
		}>
		Looks like you wandered off the{" "}
		<span className="text-primaryaccent font-style-heading">trail</span>
		<span className="text-dot">.</span>
	</StatusPage>
);

export default NotFound;
