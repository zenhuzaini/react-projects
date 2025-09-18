import "./App.css";

import Header from "./components/layouts/header/Header";
import ReconsiliationDashboard from "./features/reconsiliationDasboard/Main";

function App() {
	return (
		<>
			<Header></Header>
			<div className="applicationBody">
				<ReconsiliationDashboard></ReconsiliationDashboard>
			</div>

			<footer> this is footer</footer>
		</>
	);
}

export default App;
