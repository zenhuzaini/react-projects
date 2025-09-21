import { useState } from "react";
import "./css/App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ReconciliationDashboard from "./pages/ReconciliationDashboard";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Navbar></Navbar>
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Homepage></Homepage>} />
					<Route path="/projectDetail/:id" element={<Homepage />} />
					<Route path="/reconciliation" element={<ReconciliationDashboard />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
