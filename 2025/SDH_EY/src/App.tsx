import "./style/css/App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import Footer from "./components/Footer/Footer";

function App() {
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
			<Footer></Footer>
		</>
	);
}

export default App;
