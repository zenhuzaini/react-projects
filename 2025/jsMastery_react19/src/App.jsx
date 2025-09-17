import { useEffect, useState } from "react";
import "./App.css";

const Card = ({ title }) => {
	const [hasLiked, setHasLiked] = useState(false);
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log(`${title} has been liked: ${hasLiked} `);

		//dependency array--> it means it will be executed, if there is a change of this parameter
	}, [hasLiked]);

	//we can also use multiple useeffect
	useEffect(() => {
		console.log("card rendered");
	}, []);

	return (
		//setCount(count + 1)} -- this is not correct. you cannot use like that
		//we should use (prevState)=>prevstate+1
		<div className="card" onClick={() => setCount((prevState) => prevState + 1)}>
			<h2>
				{title} <br />
				{count || null}
			</h2>
			<button onClick={() => setHasLiked(!hasLiked)}>{hasLiked ? "💕" : "🤍"}</button>
		</div>
	);
};

const App = () => {
	return (
		<>
			<div className="card-container">
				<Card title="Wednesday" />
				<Card title="Lion king" />
				<Card title="the Amazon" />
				<h2>Functional component</h2>
			</div>
		</>
	);
};

export default App;
