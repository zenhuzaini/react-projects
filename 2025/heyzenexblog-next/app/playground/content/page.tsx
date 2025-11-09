"use client";

import SectionTitle from "@/components/layout/HomepageBlockLayouts/SectionTitle";
import { DatePicker } from "@/components/molecule/DatePicker";
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
	InputGroupTextarea,
	InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import Chat from "@/icons/Chat";
import Globe from "@/icons/Globe";
import PhotoImageIcon from "@/icons/PhotoImageIcon";
import XMark from "@/icons/XMark";
import { InfoIcon } from "lucide-react";
import Map from "@/icons/Map";
import AtSymbol from "@/icons/AtSymbol";
import { storyContentsMock } from "@/mock/storyContent";
import MyJsonEditor from "@/components/ui/jsonEditor";
import { PhotoCardDetailType, StoryContentType } from "@/types/components";
import { photoMockStatic } from "@/mock/photo";
import CheckSymbol from "@/icons/CheckSymbol";
import { useEffect, useState } from "react";
import InputWithIconAndValidation from "@/components/molecule/inputs/InputWithIconAndValidation";
import MainStoryBookPage from "@/components/layout/StoryBookBlockLayouts/MainStoryBookPage";

const ContentPlayground = () => {
	// Dates
	const [openStartDate, setOpenStartDate] = useState(false);
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);
	const [openEndDate, setOpenEndDate] = useState(false);
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);

	// Text fields states
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [location, setLocation] = useState<string>("London, United Kingdom");
	const [lat, setLat] = useState<string>("-555555");
	const [long, setLong] = useState<string>("111111");
	const [photoCover, setPhotoCover] = useState<string>(
		"https://d2exd72xrrp1s7.cloudfront.net/www/1u/1uqh5llwgt6mg19rb2yzuxgo1050bzuy4k-c2824503-full/19040aaca35?width=3360&crop=false&q=70"
	);
	const [ig, setIg] = useState<string>("link to ig");
	const [yt, setYt] = useState<string>("link to yt");
	const [strava, setStrava] = useState<string>("link to strava");
	const [komoot, setKomoot] = useState<string>("link to komoot");
	const [otherUrl, setOtherUrl] = useState<string>("");
	const [createdAt, setCreatedAt] = useState<string>("");

	// Photo collections and content (JSON editor)
	const [photoCollections, setPhotoCollections] =
		useState<PhotoCardDetailType[]>(photoMockStatic);
	const [content, setContent] = useState<StoryContentType[]>(storyContentsMock);

	const characterCounter = 160 - description.length;

	useEffect(() => {
		const date = new Date();
		const formatted = date.toLocaleDateString("en-GB", {
			weekday: "short",
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
		setCreatedAt(formatted);
	}, []);

	return (
		<div className="flex flex-col gap-5 lg:gap-10">
			<div className="flex flex-col gap-5 lg:gap-9">
				<SectionTitle
					left={
						<>
							<span className="font-extrabold text-primaryaccent">create</span>
							<br />
							<span className="font-extralight">your</span>
						</>
					}
					right="Story!"
				/>
				<div className="grid lg:grid-cols-3 h-full">
					<div className="lg:col-span-2 w-full h-full overflow-hidden">
						<MyJsonEditor content={content} setContent={setContent} />
					</div>

					<div className="w-full h-full rounded-2xl">
						<div className="grid w-full max-w-sm gap-6">
							<InputGroup>
								<InputGroupInput
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="Title"
								/>
								<InputGroupAddon>
									<Chat size={4} />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									{!title ? (
										<XMark size={4} className="stroke-4 text-primaryred" />
									) : (
										<CheckSymbol
											size={4}
											className="stroke-4 text-primaryfreshgreen"
										/>
									)}
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupTextarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="description for this content"
								/>
								<InputGroupAddon align="block-end">
									<InputGroupText className="ml-auto">
										{characterCounter} char left
									</InputGroupText>
									<Separator orientation="vertical" className="h-4!" />
									{!description ? (
										<XMark size={4} className="stroke-4 text-primaryred" />
									) : (
										<CheckSymbol
											size={4}
											className="stroke-4 text-primaryfreshgreen"
										/>
									)}
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<div className="grid grid-cols-2 gap-3">
								<DatePicker
									date={startDate}
									setDate={setStartDate}
									open={openStartDate}
									setOpen={() => setOpenStartDate((prev) => !prev)}
									label="Date Start"
								/>
								<DatePicker
									date={endDate}
									setDate={setEndDate}
									open={openEndDate}
									setOpen={() => setOpenEndDate((prev) => !prev)}
									label="Date End"
								/>
							</div>

							<InputWithIconAndValidation
								value={photoCover}
								onChange={(e) => setPhotoCover(e.target.value)}
								placeholder="photo cover Url"
								icon={<PhotoImageIcon size={4} />}
							/>

							<InputWithIconAndValidation
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								placeholder="Location"
								icon={<Globe size={4} />}
							/>

							<div className="grid grid-cols-2 gap-3">
								<InputWithIconAndValidation
									value={lat}
									onChange={(e) => setLat(e.target.value)}
									placeholder="Latitude"
									icon={<Map size={4} />}
								/>
								<InputWithIconAndValidation
									value={long}
									onChange={(e) => setLong(e.target.value)}
									placeholder="Longitude"
									icon={<Map size={4} />}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<InputWithIconAndValidation
									value={ig}
									onChange={(e) => setIg(e.target.value)}
									placeholder="Instagram"
									icon={<AtSymbol size={4} />}
								/>
								<InputWithIconAndValidation
									value={komoot}
									onChange={(e) => setKomoot(e.target.value)}
									placeholder="Komoot"
									icon={<AtSymbol size={4} />}
								/>

								<InputWithIconAndValidation
									value={strava}
									onChange={(e) => setStrava(e.target.value)}
									placeholder="Strava"
									icon={<AtSymbol size={4} />}
								/>
								<InputWithIconAndValidation
									value={yt}
									onChange={(e) => setYt(e.target.value)}
									placeholder="Youtube"
									icon={<AtSymbol size={4} />}
								/>

								<InputWithIconAndValidation
									value={otherUrl}
									onChange={(e) => setOtherUrl(e.target.value)}
									placeholder="Other URL"
									icon={<AtSymbol size={4} />}
								/>
							</div>

							<div className="flex flex-col gap-1">
								<div className="text-primaryText">Photos</div>
								<MyJsonEditor
									content={photoCollections}
									setContent={setPhotoCollections}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<Separator className="border-t-2 bg-transparent border-primaryaccent border-dashed"></Separator>
			</div>
			{/* Preview */}
			<div className="flex flex-col gap-5">
				<SectionTitle left={null} right="Preview" />

				<MainStoryBookPage
					createdAt={createdAt}
					storyCover={photoCover}
					storyId={"2"}
					storyTitle={title}
					storyDescription={description}
					storyPhotoUrls={photoCollections}
					storyContent={content}
				/>
			</div>
		</div>
	);
};

export default ContentPlayground;
