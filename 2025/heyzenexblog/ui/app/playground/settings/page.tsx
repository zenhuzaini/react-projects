import type { Metadata } from "next";
import { createBaseMetadata } from "@/lib/seo";
import AccentSettings from "./AccentSettings";

export const metadata: Metadata = createBaseMetadata({
	title: "Settings",
	description: "Customize the accent colors of the site.",
	path: "/settings",
	robotsIndex: false,
});

const SettingsPage = () => <AccentSettings />;

export default SettingsPage;
