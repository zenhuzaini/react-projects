import React, { useState } from "react";
import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

// Define row type
interface Row {
	id: string;
	company: string;
	profit: string;
	input: string;
	doc: string;
	amount: string;
}

const rows: Row[] = [
	{
		id: "10012",
		company: "Company1",
		profit: "151002",
		input: "Fifa",
		doc: "AA",
		amount: "$3638",
	},
	{
		id: "10013",
		company: "Company3",
		profit: "152003",
		input: "Fiap",
		doc: "AF",
		amount: "$4727",
	},
	{
		id: "10014",
		company: "Company5",
		profit: "156004",
		input: "173C",
		doc: "KZ",
		amount: "$5600",
	},
	{
		id: "10015",
		company: "Company4",
		profit: "156000",
		input: "12P",
		doc: "KN",
		amount: "$4080",
	},
	{
		id: "10016",
		company: "Company2",
		profit: "151001",
		input: "TRSY",
		doc: "ZV",
		amount: "$4700.64",
	},
];

export default function MatchedTable() {
	return (
		<TableContainer component={Paper} sx={{ backgroundColor: "#2a2a3d" }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell sx={{ color: "white" }}>Match ID</TableCell>
						<TableCell sx={{ color: "white" }}>Company Code</TableCell>
						<TableCell sx={{ color: "white" }}>Profit Center</TableCell>
						<TableCell sx={{ color: "white" }}>Input ID</TableCell>
						<TableCell sx={{ color: "white" }}>Doc Type</TableCell>
						<TableCell sx={{ color: "white" }}>Matched Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row: Row) => (
						<TableRow key={row.id}>
							<TableCell>
								<Button href="#" sx={{ textTransform: "none" }}>
									{row.id}
								</Button>
							</TableCell>
							<TableCell sx={{ color: "white" }}>{row.company}</TableCell>
							<TableCell sx={{ color: "white" }}>{row.profit}</TableCell>
							<TableCell sx={{ color: "white" }}>{row.input}</TableCell>
							<TableCell sx={{ color: "white" }}>{row.doc}</TableCell>
							<TableCell sx={{ color: "white" }}>{row.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
