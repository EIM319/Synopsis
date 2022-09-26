import {
	arrayRemove,
	arrayUnion,
	doc,
	updateDoc,
} from "firebase/firestore/lite";
import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ReadingInput({
	monitoring,
	database,
	userName,
	type,
	timeSegment,
	docId,
}) {
	const [value, setValue] = useState("");
	const [submitted, setSubmitted] = useState(false);

	async function submit() {
		setSubmitted(true);
		const ref = doc(database, "users/" + userName);
		await updateDoc(ref, {
			readings: arrayUnion({
				item: monitoring.name,
				date: Date(),
				value: value,
				type: type,
			}),
		});

		if (timeSegment !== null && docId !== undefined) {
			var currentRecordings = monitoring.recordings;
			if (currentRecordings === undefined || currentRecordings === null) {
				currentRecordings = [
					false,
					false,
					false,
					false,
					false,
					false,
					false,
				];
			}
			currentRecordings[timeSegment] = true;
			const docRef = doc(database, "users", userName, "archive", docId);
			updateDoc(docRef, {
				monitoring: arrayRemove(monitoring),
			});
			monitoring.recordings = currentRecordings;
			updateDoc(docRef, {
				monitoring: arrayUnion(monitoring),
			});
		}

		toast.success("Submitted");
	}

	if (submitted) return null;

	if (type === "Check-In") {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "10px 0px 10px 0px",
				}}
			>
				<Button
					style={{ width: "fit-content" }}
					onClick={() => {
						submit();
					}}
				>
					Check In
				</Button>
			</div>
		);
	}

	if (type === "Number") {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "10px 0px 10px 0px",
				}}
			>
				<InputGroup>
					<FormControl
						placeholder="Enter reading here"
						value={value}
						type="number"
						onChange={(event) => {
							setValue(event.target.value);
						}}
					/>
					<Button
						onClick={() => {
							submit();
						}}
						style={{ zIndex: 0 }}
					>
						Submit
					</Button>
				</InputGroup>
			</div>
		);
	}

	if (type === "Text") {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "10px 0px 10px 0px",
				}}
			>
				<InputGroup>
					<FormControl
						placeholder="Enter reading here"
						value={value}
						onChange={(event) => {
							setValue(event.target.value);
						}}
					/>
					<Button
						onClick={() => {
							submit();
						}}
						style={{ zIndex: 0 }}
					>
						Submit
					</Button>
				</InputGroup>
			</div>
		);
	}
}
