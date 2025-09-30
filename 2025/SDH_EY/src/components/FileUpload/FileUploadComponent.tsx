import { FileUploadOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import UploadBarProgress from "../UploadBarProgress/UploadBarProgress";
import CustomizedButton from "../Buttons/CustomizedButton";

// This needds to be generec -- so it can accept the value
const FileUploadComponent = () => {
	const [success, setUploadSuccess] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string>("");
	const [description, setDescription] = useState<string>(
		"your description here"
	);

	const [progress, setProgress] = useState(0);

	// Animate progress for mock/demo
	useEffect(() => {
		if (progress < 100) {
			const timer = setTimeout(
				() => setProgress((p) => Math.min(p + 1, 100)),
				35
			);
			return () => clearTimeout(timer);
		}
	}, [progress]);

	const completed = progress === 100;

	// Trigger the file input when button is clicked
	const handleButtonClick = () => {
		inputRef.current?.click();
	};

	// Handle file selection and upload logic
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			console.log("test");
			const formData = new FormData();
			formData.append("file", file);
			setProgress(1);
			setFileName(event.target.files?.[0].name ?? "test.txt");
			setUploadSuccess((prev) => !prev);
		}
	};

	return (
		<div>
			<Box
				onClick={handleButtonClick}
				sx={{
					":hover": {
						backgroundColor: "#34343dff",
						cursor: "pointer",
					},
					width: "100%",
					height: "200px",
					backgroundColor: "#454550ff",
					border: "3px dotted",
					borderRadius: 3,
					alignContent: "center",
					alignItems: "center",

					justifyItems: "center",
				}}>
				<Typography variant="body1" color="initial">
					<FileUploadOutlined />
				</Typography>
				<Typography variant="body2" color="initial">
					Click to upload or drag and drop
				</Typography>
				<Typography variant="body2" color="initial">
					CPDF, DOCX, or XLSX
				</Typography>
				<input
					type="file"
					style={{ display: "none" }}
					ref={inputRef}
					onChange={handleFileChange}></input>
			</Box>
			{success && (
				<div style={{ marginTop: "30px" }}>
					<UploadBarProgress
						filename={fileName}
						sizeKb={200}
						progress={progress}
						completed={completed}
						description={description}
						setDescription={setDescription}
					/>
				</div>
			)}

			{/* this is also needs to be removed to the parent */}
			{success && completed && (
				<div
					style={{
						marginTop: "1%",
						display: "flex",
						gap: 10,
						justifyContent: "flex-end",
					}}>
					<CustomizedButton
						text="Cancel"
						setButtonClicked={() => {}}></CustomizedButton>
					<CustomizedButton
						text="Upload"
						setButtonClicked={() => {}}></CustomizedButton>
				</div>
			)}
		</div>
	);
};

export default FileUploadComponent;
