import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Button, FormControl, InputGroup, Spinner } from "react-bootstrap";
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
	const [isSaving, setSaving] = useState(false);
	const [ref, setRef] = useState();

	useEffect(() => {
		if (isDone && timeSegment !== null) {
			getData(
				database,
				userName,
				monitoring,
				timeSegment,
				setValue,
				setRef
			);
			setSubmitted(true);
		}
	}, []);

	async function submit() {
		if (isSaving) return;
		setSaving(true);
		console.log(ref);
		if (ref === undefined) {
			const collectionRef = collection(
				database,
				"readings/" + userName + "/readings"
			);
			const date = new Date();
			const newRef = await addDoc(collectionRef, {
				item: monitoring.name,
				date: date.toISOString(),
				value: value,
				type: type,
				timeSegment: timeSegment,
			});
			setRef(newRef);

			if (timeSegment !== null && docId !== undefined) {
				var currentRecordings = monitoring.recordings;
				if (
					currentRecordings === undefined ||
					currentRecordings === null
				) {
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
				const docRef = doc(
					database,
					"users",
					userName,
					"archive",
					docId
				);
				monitoring.recordings = currentRecordings;

				if (isArticle) {
					await updateDoc(docRef, {
						monitoring: allMonitoring,
					});
				} else {
					await updateDoc(docRef, {
						medication: allMonitoring,
					});
				}
			}
		} else {
			await updateDoc(ref, {
				value: value,
			});
		}

		setSubmitted(true);
		setSaving(false);
		toast.success("Submitted");
	}

	if (type === "Check-In") {
		if (submitted) {
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
						{isSaving ? (
							<Spinner
								animation="border"
								role="status"
								style={{ height: 20, width: 20 }}
							>
								<span className="visually-hidden">
									Loading...
								</span>
							</Spinner>
						) : (
							"Check In"
						)}
					</Button>
				</div>
			);
		}
	}

	if (type === "Number") {
		if (submitted) {
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
						<Button
							onClick={() => {
								setSubmitted(false);
							}}
							style={{ zIndex: 0 }}
						>
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
							{isSaving ? (
								<Spinner
									animation="border"
									role="status"
									style={{ height: 20, width: 20 }}
								>
									<span className="visually-hidden">
										Loading...
									</span>
								</Spinner>
							) : (
								"Submit"
							)}
						</Button>
					</InputGroup>
				</div>
			);
		}
	}

	if (type === "Text") {
		if (submitted) {
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
						<Button
							onClick={() => {
								setSubmitted(false);
							}}
							style={{ zIndex: 0 }}
						>
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
							{isSaving ? (
								<Spinner
									animation="border"
									role="status"
									style={{ height: 20, width: 20 }}
								>
									<span className="visually-hidden">
										Loading...
									</span>
								</Spinner>
							) : (
								"Submit"
							)}
						</Button>
					</InputGroup>
				</div>
			);
		}
	}
}

async function getData(
	database,
	userName,
	monitoring,
	timeSegment,
	setValue,
	setRef
) {
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
			setRef(item.ref);
			return;
		}
	});
}
