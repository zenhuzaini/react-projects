import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import ArrowRight from "@/icons/ArrowRight";
import Link from "next/link";
import { ReactNode } from "react";

type StatusPageProps = {
	imageSrc: string;
	imageAlt?: string;
	title: string;
	children: ReactNode;
	actions?: ReactNode;
};

const StatusPage = ({
	imageSrc,
	imageAlt,
	title,
	children,
	actions,
}: StatusPageProps) => {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 w-full md:items-center">
				<div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] pr-3 pb-3">
					<div
						aria-hidden="true"
						className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-primaryaccent/60"
					/>
					<div className="relative h-full w-full overflow-hidden rounded-3xl shadow-lg">
						<ImageWithSkeleton loading="eager" src={imageSrc} alt={imageAlt} />
					</div>
				</div>

				<div className="flex flex-col justify-center gap-6">
					<div className="text-primaryText font-bold tracking-tighter leading-[0.9] flex flex-col gap-4 lg:gap-3">
						<h1 className="text-primaryaccent font-extrabold text-6xl lg:text-9xl">
							{title}
						</h1>
						<p className="text-3xl lg:text-4xl font-light">{children}</p>
					</div>

					{actions && <div className="flex flex-wrap gap-3">{actions}</div>}

					<Link href="/" className="flex gap-2 items-center w-fit">
						<span className="text-2xl font-extralight tracking-tighter lg:text-4xl">
							lesshhgo
							<span className="text-primaryaccent font-style-heading">
								home
							</span>
						</span>
						<ArrowRight />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default StatusPage;
