import { arrayUnion, doc, updateDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ReadingInput({ item, database, userName, type }) {
	const [value, setValue] = useState("");
	const [submitted, setSubmitted] = useState(false);

	async function submit() {
		setSubmitted(true);
		const ref = doc(database, "users/" + userName);
		await updateDoc(ref, {
			readings: arrayUnion({
				item: item.name,
				date: Date(),
				value: value,
				type: type,
			}),
		});
		toast.success("Submitted");
		setValue("");
	}

	if (submitted) return null;

	if (type === "Check-In") {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "0px 10px 0px 10px",
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
					padding: "0px 10px 0px 10px",
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
					padding: "0px 10px 0px 10px",
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
