import "./style/css/App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Project from "./pages/Project";
import Footer from "./components/Footer/Footer";
import MatchedTransaction from "./pages/MatchedTransaction";

function App() {
	return (
		<>
			<Navbar></Navbar>
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Homepage></Homepage>} />
					{/* TODO: add id later */}
					<Route path="/project/:projectId" element={<Project />} />
					<Route
						path="/project/:projectId/matched-transaction/:matchId"
						element={<MatchedTransaction />}
					/>
				</Routes>
			</main>
			<Footer></Footer>
		</>
	);
}

export default App;
