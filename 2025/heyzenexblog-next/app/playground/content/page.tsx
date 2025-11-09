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

import { JsonEditor } from "json-edit-react";

import { storyContentExample } from "@/mock/storyContent";
import { DataContentType } from "@/types/data";

const ContentPlayground = () => {
	const [openStartDate, setOpenStartDate] = React.useState(false);
	const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);

	const [openEndDate, setOpenEndDate] = React.useState(false);
	const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);

	const [title, setTitle] = React.useState<string>();
	const [description, setDescription] = React.useState<string>();
	const [location, setLocation] = React.useState<string>();
	const [lat, setLat] = React.useState<string>();
	const [long, setLong] = React.useState<string>();
	const [photoCover, setPhotoCover] = React.useState<string>();
	const [ig, setIg] = React.useState<string>();
	const [yt, setYt] = React.useState<string>();
	const [strava, setStrava] = React.useState<string>();
	const [komoot, setKomoot] = React.useState<string>();
	const [otherUrl, setOtherUrl] = React.useState<string>();
	const [photoCollections, setPhotoCollections] = React.useState<string[]>();
	const [content, setContent] =
		React.useState<DataContentType[]>(storyContentExample);

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
				<div className="grid lg:grid-cols-3 gap-4 h-full">
					<div className="lg:col-span-2 w-full h-full overflow-hidden ">
						<JsonEditor
							data={content}
							setData={(data) => {
								console.log("in ", data);
								setContent(data as DataContentType[]);
							}} // optional
						/>
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
									<XMark size={4}></XMark>
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupTextarea placeholder="Ask, Search or Chat..." />
								<InputGroupAddon align="block-end">
									<InputGroupText className="ml-auto">
										52 char left
									</InputGroupText>
									<Separator orientation="vertical" className="h-4!" />
									<CheckIcon />
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
								<InputGroupInput placeholder="photo cover Url" />
								<InputGroupAddon>
									<PhotoImageIcon size={4}></PhotoImageIcon>
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>
							<InputGroup>
								<InputGroupInput placeholder="Location" />
								<InputGroupAddon>
									<Globe size={4} />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>
							<div className="grid grid-cols-2 gap-3">
								<InputGroup>
									<InputGroupInput placeholder="Latitude" />
									<InputGroupAddon>
										<Map size={4} />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<CheckIcon />
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput placeholder="Longitude" />
									<InputGroupAddon>
										<Map size={4} />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<CheckIcon />
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<InputGroup>
									<InputGroupInput placeholder="Instagram" />
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<CheckIcon />
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput placeholder="Komoot" />
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<CheckIcon />
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput placeholder="Strava" />
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<CheckIcon />
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput placeholder="Youtube" />
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<CheckIcon />
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>

								<InputGroup>
									<InputGroupInput placeholder="Other URL" />
									<InputGroupAddon>
										<AtSymbol size={4}></AtSymbol>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<CheckIcon />
										<InfoIcon />
									</InputGroupAddon>
								</InputGroup>
							</div>

							<div></div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<SectionTitle left={<></>} right={<>Preview</>}></SectionTitle>
			</div>
		</div>
	);
};

export default ContentPlayground;
