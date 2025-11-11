import type { MDXComponents } from "mdx/types";
import Paragraph from "./components/layout/StoryBookBlockLayouts/2_BasicPharagraph/Paragraph";
import PhotoPharagraph from "./components/layout/StoryBookBlockLayouts/3_PhotoParagraph/PhotoPharagraph";
import { PhotoCardDetailType } from "./types/components";
import PharagraphPhoto from "./components/layout/StoryBookBlockLayouts/4_PharagraphPhoto/PharagraphPhoto";
import ShortDescription from "./components/layout/StoryBookBlockLayouts/1_ShortDescription/ShortDescription";
import FullPhoto from "./components/layout/StoryBookBlockLayouts/5_FullPhoto/FullPhoto";
import PhotoCollectionGrid from "./components/layout/StoryBookBlockLayouts/6_PhotoCollectionGrid/PhotoCollectionGrid";
import { ComponentPropsWithoutRef } from "react";

type ParagraphProps = ComponentPropsWithoutRef<"p">;

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
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}
