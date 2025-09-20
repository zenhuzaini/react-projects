import { useState } from "react";
import "./css/App.css";
import Navbar from "./components/Navbar/Navbar";
import BannerHeader from "./components/BannerHeader/BannerHeader";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Navbar></Navbar>
			<BannerHeader></BannerHeader>
			<main className="main-content"></main>
		</>
	);
}

export default App;
