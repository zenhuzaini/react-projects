import Moon from "./icons/Moon";
import Sun from "./icons/Sun";

export default function Home() {
	return (
		<div className="">
			<div className="grid grid-cols-6 gap-4 h-28 bg-amber-200">
				<div className="">
					<div>
						<h1>
							ZEN
							<br />
							HUZAINI
						</h1>
					</div>
				</div>
				<div className="col-span-2 col-start-2 col-end-3">
					<div>
						<nav>
							<a>Home</a>
							<a>Photography</a>
							<a>Adventures</a>
							<a>Contact</a>
						</nav>
					</div>
				</div>

				<div className="col-start-6 col-end-7 ">
					<div className="flex">
						<Sun></Sun>
						<Moon></Moon>
					</div>
				</div>
			</div>
		</div>
	);
}
