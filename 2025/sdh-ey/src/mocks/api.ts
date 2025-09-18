export const apiResponse = {
	getUnmatchedRecords: {
		users: {
			result_doc_id: "f8c1d2e0-9a8b-11ee-9f1d-0242ac120002",
			operation_id: "op12345-uuid",
			project_id: "proj56789-uuid",
			triggered_at: "2025-09-05T10:15:00Z",
			processed_at: "2025-09-05T10:45:00Z",
			version: "v1.0",
			summary: {
				total_records: 1000,
				matched_records: 600,
				unmatched_records: 300,
				partial_matched_records: 100,
				processing_time: "00:30:00",
			},
			results: {
				matched: [
					{
						MatchID: "M001",
						col1: "Customer",
						col2: "Amount",
						Amount: 5000,
						details: {
							FileA: {
								file1_row: 1,
								Customer: "C001",
								Amount: 5000,
								InvoiceNo: "INV1001",
								PostingDate: "2025-09-01",
							},
							FileB: {
								file2_row: 1,
								Customer: "C001",
								Amount: 5000,
								InvoiceNo: "INV1001",
								PostingDate: "2025-09-01",
							},
						},
					},
				],
				unmatched: [
					{
						MatchID: "U001",
						col1: "Customer",
						col2: "Amount",
						Amount: 7000,
						details: {
							FileA: {
								file1_row: 2,
								Customer: "C002",
								Amount: 7000,
								InvoiceNo: "INV2002",
							},
							FileB: {
								file2_row: 1,
								Customer: "C001",
								Amount: 5000,
								InvoiceNo: "INV1001",
								PostingDate: "2025-09-01",
							},
						},
					},
				],
				partial: [
					{
						MatchID: "PM001",
						col1: "Customer",
						col2: "Amount",
						Amount_Difference: 100,
						details: {
							FileA: {
								file1_row: 3,
								Customer: "C003",
								Amount: 4500,
								InvoiceNo: "INV3003",
							},
							FileB: {
								file2_row: 3,
								Customer: "C003",
								Amount: 4600,
								InvoiceNo: "INV3003",
							},
						},
					},
				],
			},
		},
	},
};
