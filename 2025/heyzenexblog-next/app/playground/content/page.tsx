"use client";
import SectionTitle from "@/components/layout/HomepageBlockLayouts/SectionTitle";
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
	InputGroupTextarea,
	InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import XMark from "@/icons/XMark";
import {
	SearchIcon,
	MailIcon,
	CreditCardIcon,
	CheckIcon,
	StarIcon,
	InfoIcon,
} from "lucide-react";
import React from "react";

const ContentPlayground = () => {
	return (
		<div className="flex flex-col gap-5 lg:gap-9">
			<SectionTitle
				left={
					<>
						<span className="font-extrabold text-primaryaccent">create</span>
						<br />
						<span className="font-extralight">imaginary</span>
					</>
				}
				right={<>Story!</>}></SectionTitle>
			<div className="grid lg:grid-cols-3 gap-4 h-full">
				<div className="lg:col-span-2 w-full h-full bg-accentbackground rounded-2xl">
					04
				</div>
				<div className="w-full h-full rounded-2xl">
					<div className="grid w-full max-w-sm gap-6">
						<InputGroup>
							<InputGroupInput placeholder="Title" />
							<InputGroupAddon>
								<SearchIcon />
							</InputGroupAddon>
							<InputGroupAddon align="inline-end">
								<XMark></XMark>
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

						<InputGroup>
							<InputGroupInput placeholder="photo cover Url" />
							<InputGroupAddon>
								<MailIcon />
							</InputGroupAddon>
							<InputGroupAddon align="inline-end">
								<CheckIcon />
								<InfoIcon />
							</InputGroupAddon>
						</InputGroup>
						<InputGroup>
							<InputGroupInput placeholder="Location" />
							<InputGroupAddon>
								<MailIcon />
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
									<MailIcon />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupInput placeholder="Longitude" />
								<InputGroupAddon>
									<MailIcon />
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
									<MailIcon />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupInput placeholder="Komoot" />
								<InputGroupAddon>
									<MailIcon />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupInput placeholder="Strava" />
								<InputGroupAddon>
									<MailIcon />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupInput placeholder="Youtube" />
								<InputGroupAddon>
									<MailIcon />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>

							<InputGroup>
								<InputGroupInput placeholder="Other URL" />
								<InputGroupAddon>
									<MailIcon />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<CheckIcon />
									<InfoIcon />
								</InputGroupAddon>
							</InputGroup>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContentPlayground;
