import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";

export default function Home() {
	return (
		<div className="ml-2 mr-2 flex flex-col gap-2 sm:ml-20 sm:mr-20 sm:gap-10">
			<Header></Header>
			<Hero></Hero>
		</div>
	);
}
