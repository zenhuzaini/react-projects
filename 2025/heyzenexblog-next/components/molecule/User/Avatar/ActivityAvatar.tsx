import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import CheckSymbol from "@/icons/CheckSymbol";

const ActivityAvatar = ({
	url = "https://yt3.googleusercontent.com/4tN6FVc3O1GU8KNdNswDqHdvNYaunyHjrdvjd_RMLqLfZl_8RikDsLOEg6fok_z_ur5tQR5N=s900-c-k-c0x00ffffff-no-rj",
	alt,
	avatarName,
	publishedDate,
	activityType,
}: {
	url?: string;
	alt: string;
	avatarName: string;
	publishedDate: string;
	activityType: string;
}) => {
	const date = new Date(publishedDate);
	const parts = {
		weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
		month: date.toLocaleDateString("en-US", { month: "short" }),
		day: date.toLocaleDateString("en-US", { day: "2-digit" }),
		year: date.getFullYear(),
	};

	const formattedDate = `${parts.weekday}, ${parts.month} ${parts.day} ${parts.year}`;

	return (
		<div className="mt-2 flex flex-row items-center gap-1 md:gap-2">
			<Avatar className="size-9 md:size-9">
				<AvatarImage src={url} alt={alt} />
				<AvatarFallback>{avatarName}</AvatarFallback>
			</Avatar>

			<div className="flex flex-col text-sm md:text-lg">
				<p className="text-primarytextInvert font-extralight">{avatarName}</p>
				<p className="flex gap-1 text-[12px] items-center text-primarytextInvert md:text-sm tracking-tight">
					went
					<span className="flex gap-1 items-center">
						<span className="text-primaryaccent font-extrabold flex">
							<span className="text-dot">#</span>
							{activityType}
						</span>

						<div className="rounded-3xl h-4 w-0.5 bg-dot" />

						{formattedDate}
					</span>
				</p>
			</div>
		</div>
	);
};

export default ActivityAvatar;
