import {
	arrayUnion,
	collection,
	doc,
	getDoc,
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
			blood_pressure: arrayUnion({
				date: Date(),
				value: value,
			}),
		});
		setValue("");
	}

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<p style={{ fontSize: 17, marginBottom: 10, fontWeight: 500 }}>
				{item.name}
			</p>
			<InputGroup>
				<FormControl
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
					}}
				></FormControl>
				<Button
					onClick={() => {
						submitValue();
					}}
				>
					Submit
				</Button>
			</InputGroup>
		</div>
	);
}
