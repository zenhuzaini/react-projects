import { useState } from "react";
import PhotoWithDetail from "./components/Cards/PhotoWithDetail";
import Footer from "./components/Footer/Footer";

import Navbar from "./components/Navbar/Navbar";
import { photoMock } from "./mock/photo";
import type { PhotoCardDetailType } from "./types/components";

const App = () => {
	const [photos, _setPhotos] = useState<PhotoCardDetailType[]>(
		photoMock({ length: 30 })
	);
	const photoCards = photos.map((photo, id) => (
		<PhotoWithDetail
			month={photo.month}
			year={photo.year}
			url={photo.photoUrl}
			city={photo.city}
			country={photo.country}
			key={id}></PhotoWithDetail>
	));
	return (
		<div className="bg-mybackground min-h-screen w-screen flex flex-col">
			{/* <!-- navbar --> */}
			<Navbar></Navbar>
			{/* end navbar */}

			{/* jumbotron */}
			{/* <Jumbotron></Jumbotron> */}

			{/* content  */}
			{/* add flex-grow / grow, to create space */}
			<div className="px-10 lg:px-30 py-10 grow">
				{/* grid-cols-2 sets 2 columns on all screen sizes by default, including phones. */}
				{/* sm:grid-cols-2 explicitly keeps 2 columns at the sm breakpoint and above (optional since it's the same as default). */}
				{/* md:grid-cols-3 changes to 3 columns starting from the md breakpoint (768px and above). */}
				<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
					{photoCards}
				</div>
			</div>
			{/* end content */}

			{/* Footer  */}
			<Footer></Footer>
			{/* ENd Footer */}
		</div>
	);
};

export default App;
