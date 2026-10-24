import StatusPage from "./StatusPage";

const ErrorPage = () => {
	return (
		<StatusPage
			imageSrc="/sad-cat.png"
			imageAlt="Sad cat - error"
			title="Ouch..">
			Something went{" "}
			<span className="text-primaryaccent font-style-heading">WRONG!</span>
			<span className="text-dot">.</span>
		</StatusPage>
	);
};

export default ErrorPage;
