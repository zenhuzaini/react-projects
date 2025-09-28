import { Box, Typography } from "@mui/material";
import type { BasicCardDetailPropsType } from "../../types/components";

const ProjectCardBasic = ({ data }: BasicCardDetailPropsType) => {
	const mappedCard = data.map((infoDetails) => {
		let bgCol = "";
		const infoDetail = infoDetails.map((x, i) => {
			bgCol = x.backgroundColor; //this will be looped 2 times. smelly code, needs to be rfactored
			return (
				<Box key={i}>
					<Typography variant={x.valueVariant} color={x.textColor}>
						{x.value}
					</Typography>
					<Typography variant={x.descriptionVariant} color={x.textColor}>
						{x.description}
					</Typography>
				</Box>
			);
		});

		return (
			<Box
				sx={{
					borderRadius: 3,
					display: "flex",
					gap: 6,
					padding: "1%",
					width: "fit-content",

					background: bgCol,
				}}>
				{infoDetail}
			</Box>
		);
	});

	return <>{mappedCard}</>;
};

export default ProjectCardBasic;
