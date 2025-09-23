import { useState } from "react";
import "./css/App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Navbar></Navbar>
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Homepage></Homepage>} />
					{/* TODO: add id later */}
					<Route path="/project" element={<Project />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
