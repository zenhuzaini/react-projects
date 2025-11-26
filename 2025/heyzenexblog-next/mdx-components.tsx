import type { MDXComponents } from "mdx/types";
import Paragraph from "./components/layout/StoryBookBlockLayouts/2_BasicPharagraph/Paragraph";
import PhotoPharagraph from "./components/layout/StoryBookBlockLayouts/3_PhotoParagraph/PhotoPharagraph";
import { PhotoCardDetailType } from "./types/components";
import PharagraphPhoto from "./components/layout/StoryBookBlockLayouts/4_PharagraphPhoto/PharagraphPhoto";
import ShortDescription from "./components/layout/StoryBookBlockLayouts/1_ShortDescription/ShortDescription";
import FullPhoto from "./components/layout/StoryBookBlockLayouts/5_FullPhoto/FullPhoto";
import PhotoCollectionGrid from "./components/layout/StoryBookBlockLayouts/6_PhotoCollectionGrid/PhotoCollectionGrid";
import { ComponentPropsWithoutRef } from "react";
import SectionTitle from "./components/layout/StoryBookBlockLayouts/9_SectionTitle/SectionTitle";
import Checklist from "./components/layout/StoryBookBlockLayouts/Lists/Lists";
import ItemList from "./components/layout/StoryBookBlockLayouts/Lists/ItemLists";
import HastagSymbol from "./icons/Hastag";

const components: MDXComponents = {
	Par: (props) => {
		return (
			<Paragraph
				{...(props as {
					text: string;
				})}></Paragraph>
		);
	},

	// import photo and pharagraph
	Phopha: (props) => {
		return (
			<PhotoPharagraph
				{...(props as {
					text: string;
					photo: PhotoCardDetailType;
				})}></PhotoPharagraph>
		);
	},

	Phapho: (props) => {
		return (
			<PharagraphPhoto
				{...(props as {
					text: string;
					photo: PhotoCardDetailType;
				})}></PharagraphPhoto>
		);
	},

	Quo: (props) => {
		return (
			<ShortDescription
				{...(props as {
					text: string;
					shouldCenter: boolean;
					shouldItalic: boolean;
					fontSize: "small" | "medium" | "large";
				})}
			/>
		);
	},

	Pho: (props) => {
		return (
			<FullPhoto
				{...(props as {
					photo: PhotoCardDetailType;
				})}
			/>
		);
	},

	PhoCol: (props) => {
		return (
			<PhotoCollectionGrid
				{...(props as {
					photo: PhotoCardDetailType[];
				})}
			/>
		);
	},
	Section: (props) => {
		return (
			<div className="mt-5">
				<SectionTitle
					{...(props as {
						text: string;
					})}></SectionTitle>
			</div>
		);
	},
	Center: ({ children }) => (
		<div className="mt-5 justify-center flex flex-col gap-5 sm:gap-6 text-primaryText">
			{children}
		</div>
	),
	Highlight: ({ children }) => (
		<strong className="text-primaryaccent font-bold">{children}</strong>
	),
	Checklist: (props) => <Checklist {...props} />,
	ItemList: (props) => <ItemList {...props}></ItemList>,
	hr: () => {
		return (
			<div className="sm:flex justify-end items-center w-full">
				<div className="bg-primaryaccent w-full h-1 rounded-3xl"></div>
			</div>
		);
	},
	HastagIcon: () => {
		return <HastagSymbol></HastagSymbol>;
	},
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}
