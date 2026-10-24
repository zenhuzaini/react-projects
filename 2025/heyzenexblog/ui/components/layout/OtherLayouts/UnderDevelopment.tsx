import StatusPage from "./StatusPage";

const PLACEHOLDER_IMAGE =
	"https://picsum.photos/seed/under-development/1200/800";

const UnderDevelopment = () => {
	return (
		<StatusPage
			imageSrc={PLACEHOLDER_IMAGE}
			imageAlt="Placeholder"
			title="Oopssie..">
			This page is still under{" "}
			<span className="line-through">
				<span className="text-primaryaccent">construction</span>
			</span>{" "}
			<span className="text-primaryaccent font-style-heading">development</span>
			<span className="text-dot">.</span>
		</StatusPage>
	);
};

export default UnderDevelopment;
