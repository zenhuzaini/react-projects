import React from "react";
import { JsonEditor } from "json-edit-react";
import { MyJSONEditorProps } from "@/types/components";
import { InputGroupInput } from "./input-group";

const MyJsonEditor = ({
	content,
	setContent,
	searchInput = "",
}: MyJSONEditorProps) => {
	return (
		<JsonEditor
			data={content}
			setData={(data) => {
				setContent(data);
			}}
			restrictDrag={false}
			searchFilter={"all"}
			searchDebounceTime={10}
			searchText={searchInput}
			collapse={true}
		/>
	);
};

export default MyJsonEditor;
