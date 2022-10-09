import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ReadingInput({
	monitoring,
	isArticle,
	database,
	userName,
	type,
	timeSegment,
	docId,
	isDone,
	allMonitoring,
}) {
	const [value, setValue] = useState("");
	const [submitted, setSubmitted] = useState(false);
	useEffect(() => {
		if (isDone && timeSegment !== null) {
			getData(database, userName, monitoring, timeSegment, setValue);
		}
	}, []);

	async function submit() {
		setSubmitted(true);
		const ref = collection(database, "readings/" + userName + "/readings");
		await addDoc(ref, {
			item: monitoring.name,
			date: Date(),
			value: value,
			type: type,
			timeSegment: timeSegment,
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
			monitoring.recordings = currentRecordings;

			if (isArticle) {
				updateDoc(docRef, {
					monitoring: allMonitoring,
				});
			} else {
				updateDoc(docRef, {
					medication: allMonitoring,
				});
			}
		}

		toast.success("Submitted");
		console.log(allMonitoring);
	}

	if (type === "Check-In") {
		if (submitted || isDone) {
			return <p style={{ color: "#888888" }}>Recording Saved.</p>;
		} else {
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
	}

	if (type === "Number") {
		if (submitted || isDone) {
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
							disabled={true}
						/>
						<Button onClick={() => {}} style={{ zIndex: 0 }}>
							Edit
						</Button>
					</InputGroup>
				</div>
			);
		} else {
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
	}

	if (type === "Text") {
		if (submitted || isDone) {
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
							disabled={true}
						/>
						<Button onClick={() => {}} style={{ zIndex: 0 }}>
							Edit
						</Button>
					</InputGroup>
				</div>
			);
		} else {
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
}

async function getData(database, userName, monitoring, timeSegment, setValue) {
	const ref = collection(database, "readings", userName, "readings");
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const q = query(
		ref,
		where("item", "==", monitoring.name),
		where("timeSegment", "==", timeSegment)
	);
	const docs = await getDocs(q);
	if (docs.empty) return;
	docs.docs.forEach((item) => {
		const data = item.data();
		const dataDate = new Date(data.date);
		if (dataDate >= today && dataDate < tomorrow) {
			setValue(data.value);
			return;
		}
	});
}
