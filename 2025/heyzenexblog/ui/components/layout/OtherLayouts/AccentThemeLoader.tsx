"use client";

import { useEffect } from "react";
import { applyAccents, readAccents } from "@/lib/accent";

const AccentThemeLoader = () => {
	useEffect(() => {
		applyAccents(readAccents());
	}, []);

	return null;
};

export default AccentThemeLoader;
