import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore/lite";
import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function ReadingInput({ item, database, userName }) {
	const [value, setValue] = useState("");

	async function submitValue() {
		const ref = collection(database, "users/" + userName + "/measurements");
		const document = await getDocs(ref);
		const id = document.docs[0].id;
		const docRef = doc(
			database,
			"users/" + userName + "/measurements/" + id
		);
		await updateDoc(docRef, {
			readings: arrayUnion({
				item: item.name,
				date: Date(),
				value: value,
			}),
		});
		setValue("");
	}

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
				></FormControl>
				<Button
					onClick={() => {
						submitValue();
					}}
					style={{ zIndex: 0 }}
				>
					Submit
				</Button>
			</InputGroup>
		</div>
	);
}
