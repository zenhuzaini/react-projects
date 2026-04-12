import ActivityAvatar from "@/components/molecule/User/Avatar/ActivityAvatar";
import React from "react";

const page = () => {
	return (
		<div>
			<ActivityAvatar
				activityType="bikepacking"
				alt="User Avatar"
				avatarName="Zen Huzaini"
				publishedDate="2023-10-15"></ActivityAvatar>
		</div>
	);
};

export default page;
