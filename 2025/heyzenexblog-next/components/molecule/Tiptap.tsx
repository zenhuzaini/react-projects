"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from "lowlight";
// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			CodeBlockLowlight.configure({
				lowlight,
			}),
		],
		content: "<p>Hello World! 🌎️</p>",
		// Don't render immediately on the server to avoid SSR issues
		immediatelyRender: false,
	});

	return (
		<>
			<div className="control-group">
				<div className="button-group">
					<button
						onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
						className={editor?.isActive("codeBlock") ? "is-active" : ""}>
						Toggle code block
					</button>
					<button
						onClick={() => editor?.chain().focus().setCodeBlock().run()}
						disabled={editor?.isActive("codeBlock")}>
						Set code block
					</button>
				</div>
			</div>

			<EditorContent editor={editor} className="h-[80vh] text-primaryText" />
		</>
	);
};

export default Tiptap;
