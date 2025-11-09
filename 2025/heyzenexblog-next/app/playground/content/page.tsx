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
import { CheckIcon, InfoIcon } from "lucide-react";
import React from "react";
import Map from "@/icons/Map";
import AtSymbol from "@/icons/AtSymbol";

import { storyContentExample } from "@/mock/storyContent";
import { DataContentType } from "@/types/data";
import MyJsonEditor from "@/components/ui/jsonEditor";
import { PhotoCardDetailType } from "@/types/components";
import { photoMock } from "@/mock/photo";
import CheckSymbol from "@/icons/CheckSymbol";

const ContentPlayground = () => {
	const [openStartDate, setOpenStartDate] = React.useState(false);
	const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);

	const [openEndDate, setOpenEndDate] = React.useState(false);
	const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

	const [title, setTitle] = React.useState<string>();
	const [description, setDescription] = React.useState<string>("");
	const [location, setLocation] = React.useState<string>(
		"London, United Kingdom"
	);
	const [lat, setLat] = React.useState<string>("-555555");
	const [long, setLong] = React.useState<string>("111111");
	const [photoCover, setPhotoCover] = React.useState<string>(
		"https://d2exd72xrrp1s7.cloudfront.net/www/1u/1uqh5llwgt6mg19rb2yzuxgo1050bzuy4k-c2824503-full/19040aaca35?width=3360&crop=false&q=70"
	);
	const [ig, setIg] = React.useState<string>("link to ig");
	const [yt, setYt] = React.useState<string>("link to yt");
	const [strava, setStrava] = React.useState<string>("link to strava");
	const [komoot, setKomoot] = React.useState<string>("link to komoot");
	const [otherUrl, setOtherUrl] = React.useState<string>();
	const [photoCollections, setPhotoCollections] = React.useState<
		PhotoCardDetailType[]
	>(photoMock({ length: 1 }));
	const [content, setContent] =
		React.useState<DataContentType[]>(storyContentExample);

	const characterCounter = 160 - description.length;

	return (
		<div className="flex flex-col gap-5 lg:gap-10">
			<div className="flex flex-col gap-5 lg:gap-9">
				<SectionTitle
					left={
						<>
							<span className="font-extrabold text-primaryaccent">create</span>
							<br />
							<span className="font-extralight ">your</span>
						</>
					}
					right={<>Story!</>}></SectionTitle>
				<div className="grid lg:grid-cols-3 h-full">
					<div className="lg:col-span-2 w-full h-full overflow-hidden ">
						<MyJsonEditor
							content={content}
							setContent={(x) => setContent(x)}></MyJsonEditor>
					</div>
					<div className="w-full h-full rounded-2xl">
						<div className="grid w-full max-w-sm gap-6">
							<InputGroup>
								<InputGroupInput
									value={title}
									onChange={(data) => {
										setTitle(data.target.value);
									}}
									placeholder="Title"
								/>
								<InputGroupAddon>
									<Chat size={4}></Chat>
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									{!title ? (
										<XMark
											size={4}
											className="stroke-4 text-primaryred"></XMark>
									) : (
										<CheckSymbol
											className="stroke-4 text-primaryfreshgreen"
											size={4}></CheckSymbol>
									)}

									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupTextarea
									value={description}
									onChange={(data) => setDescription(data.target.value)}
									placeholder="description for this content"
								/>
								<InputGroupAddon align="block-end">
									<InputGroupText className="ml-auto">
										{characterCounter} char left
									</InputGroupText>
									<Separator orientation="vertical" className="h-4!" />
									{!description ? (
										<XMark
											size={4}
											className="stroke-4 text-primaryred"></XMark>
									) : (
										<CheckSymbol
											className="stroke-4 text-primaryfreshgreen"
											size={4}></CheckSymbol>
									)}

									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<div className="grid grid-cols-2 gap-3">
								<InputGroup>
									<DatePicker
										date={startDate}
										setDate={(date) => setStartDate(date)}
										open={openStartDate}
										setOpen={() => setOpenStartDate((prev) => !prev)}
										label="Date Start"></DatePicker>
								</InputGroup>

								<InputGroup>
									<DatePicker
										date={endDate}
										setDate={(date) => setEndDate(date)}
										open={openEndDate}
										setOpen={() => setOpenEndDate((prev) => !prev)}
										label="Date End"></DatePicker>
								</InputGroup>
							</div>

							<InputGroup>
								<InputGroupInput
									value={photoCover}
									onChange={(data) => setPhotoCover(data.target.value)}
									placeholder="photo cover Url"
								/>
								<InputGroupAddon>
									<PhotoImageIcon size={4}></PhotoImageIcon>
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									{!photoCover ? (
										<XMark
											size={4}
											className="stroke-4 text-primaryred"></XMark>
									) : (
										<CheckSymbol
											className="stroke-4 text-primaryfreshgreen"
											size={4}></CheckSymbol>
									)}
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>
							<InputGroup>
								<InputGroupInput
									value={location}
									onChange={(data) => setLocation(data.target.value)}
									placeholder="Location"
								/>
								<InputGroupAddon>
									<Globe size={4} />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									{!location ? (
										<XMark
											size={4}
											className="stroke-4 text-primaryred"></XMark>
									) : (
										<CheckSymbol
											className="stroke-4 text-primaryfreshgreen"
											size={4}></CheckSymbol>
									)}
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>
							<div className="grid grid-cols-2 gap-3">
								<InputGroup>
									<InputGroupInput
										value={lat}
										onChange={(data) => setLat(data.target.value)}
										placeholder="Latitude"
									/>
									<InputGroupAddon>
										<Map size={4} />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										{!lat ? (
											<XMark
												size={4}
												className="stroke-4 text-primaryred"></XMark>
										) : (
											<CheckSymbol
												className="stroke-4 text-primaryfreshgreen"
												size={4}></CheckSymbol>
										)}
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput
										value={long}
										onChange={(data) => setLong(data.target.value)}
										placeholder="Longitude"
									/>
									<InputGroupAddon>
										<Map size={4} />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										{!lat ? (
											<XMark
												size={4}
												className="stroke-4 text-primaryred"></XMark>
										) : (
											<CheckSymbol
												className="stroke-4 text-primaryfreshgreen"
												size={4}></CheckSymbol>
										)}
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<InputGroup>
									<InputGroupInput
										value={ig}
										onChange={(data) => setIg(data.target.value)}
										placeholder="Instagram"
									/>
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										{!ig ? (
											<XMark
												size={4}
												className="stroke-4 text-primaryred"></XMark>
										) : (
											<CheckSymbol
												className="stroke-4 text-primaryfreshgreen"
												size={4}></CheckSymbol>
										)}
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput
										value={komoot}
										onChange={(data) => setKomoot(data.target.value)}
										placeholder="Komoot"
									/>
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										{!komoot ? (
											<XMark
												size={4}
												className="stroke-4 text-primaryred"></XMark>
										) : (
											<CheckSymbol
												className="stroke-4 text-primaryfreshgreen"
												size={4}></CheckSymbol>
										)}
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput
										value={strava}
										onChange={(data) => setStrava(data.target.value)}
										placeholder="Strava"
									/>
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										{!strava ? (
											<XMark
												size={4}
												className="stroke-4 text-primaryred"></XMark>
										) : (
											<CheckSymbol
												className="stroke-4 text-primaryfreshgreen"
												size={4}></CheckSymbol>
										)}
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput
										value={yt}
										onChange={(data) => setYt(data.target.value)}
										placeholder="Youtube"
									/>
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										{!yt ? (
											<XMark
												size={4}
												className="stroke-4 text-primaryred"></XMark>
										) : (
											<CheckSymbol
												className="stroke-4 text-primaryfreshgreen"
												size={4}></CheckSymbol>
										)}
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput
										value={otherUrl}
										onChange={(data) => setOtherUrl(data.target.value)}
										placeholder="Other URL"
									/>
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										{!otherUrl ? (
											<XMark
												size={4}
												className="stroke-4 text-primaryred"></XMark>
										) : (
											<CheckSymbol
												className="stroke-4 text-primaryfreshgreen"
												size={4}></CheckSymbol>
										)}
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<div className="flex flex-col gap-1">
								<div className="text-primaryText">Photos</div>
								<MyJsonEditor
									content={photoCollections}
									setContent={(x) => setPhotoCollections(x)}></MyJsonEditor>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Preview */}
			<div>
				<SectionTitle left={<></>} right={<>Preview</>}></SectionTitle>
			</div>
		</div>
	);
};

export default ContentPlayground;
