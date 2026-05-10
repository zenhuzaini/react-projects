import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Variant = "default" | "light" | "dark";
const ActivityAvatar = ({
	url = "https://yt3.googleusercontent.com/4tN6FVc3O1GU8KNdNswDqHdvNYaunyHjrdvjd_RMLqLfZl_8RikDsLOEg6fok_z_ur5tQR5N=s900-c-k-c0x00ffffff-no-rj",
	alt,
	avatarName,
	publishedDate,
	activityType,
	shouldShowAvatar = true,
	smallAvatar = false,
	variant = "default",
	// noAvatar = false,
}: {
	url?: string;
	alt: string;
	avatarName: string;
	publishedDate: string;
	activityType: string;
	shouldShowAvatar?: boolean;
	smallAvatar?: boolean;
	variant?: Variant;
	// noAvatar?: boolean;
}) => {
	const date = new Date(publishedDate);

	const formattedDate = date.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "2-digit",
		year: "numeric",
	});

	let textVariant;
	let textAccentVariant;
	switch (variant) {
		case "default":
			textVariant = "text-primarytextInvert";
			textAccentVariant = "text-primaryaccent";
			break;
		case "light":
			textVariant = "text-white";
			textAccentVariant = "text-white";
			break;

		case "dark":
			textVariant = "text-primaryText";
			textAccentVariant = "text-primaryText";
			break;
		default:
			break;
	}

	return (
		<div className="mt-2 flex flex-row items-center gap-1 md:gap-2">
			{shouldShowAvatar && !smallAvatar && (
				<Avatar className={smallAvatar ? "size-6" : "size-9 md:size-9"}>
					<AvatarImage src={url} alt={alt} />
					<AvatarFallback>{avatarName}</AvatarFallback>
				</Avatar>
			)}
			<div className="flex flex-col text-sm md:text-lg">
				<div className="flex gap-2 items-center">
					{smallAvatar && (
						<>
							<Avatar className={smallAvatar ? "size-6" : "size-9 md:size-9"}>
								<AvatarImage src={url} alt={alt} />
								<AvatarFallback>{avatarName}</AvatarFallback>
							</Avatar>
						</>
					)}
					{shouldShowAvatar ? (
						<p className={`${textVariant} font-extralight`}>{avatarName}</p>
					) : null}
				</div>
				<p
					className={`flex gap-1 text-[12px] items-center ${textVariant} md:text-sm tracking-tight`}>
					{shouldShowAvatar ? "went" : ""}
					<span className="flex gap-1 items-center">
						<span className={` font-extrabold flex ${textAccentVariant}`}>
							<span className="text-dot">#</span> {activityType}
						</span>
						<span className={`rounded-3xl h-4 w-0.5 bg-dot ${textVariant}`} />
						<span className={`${textVariant} font-extralight`}>
							{formattedDate}
						</span>
					</span>
				</p>
			</div>
		</div>
	);
};

export default ActivityAvatar;
