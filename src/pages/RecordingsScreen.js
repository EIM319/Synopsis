import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import LoadingComponent from "../components/LoadingComponent";
import RecordingSelector from "../components/recording/RecordingSelector";
import RecordingList from "../components/recording/RecordingList";

export default function RecordingsScreen({ userName, database }) {
	const [recordings, setRecordings] = useState();
	const [selectedRecording, setSelectedRecording] = useState();

	useEffect(() => {
		getRecordings(database, userName, setRecordings, setSelectedRecording);
	}, []);

	if (recordings === undefined) return <LoadingComponent />;

	if (recordings.size === 0) {
		return (
			<div
				style={{
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<p>No entries found</p>
			</div>
		);
	}

	return (
		<div style={{ padding: 40, width: "100%" }}>
			<RecordingSelector
				recordings={recordings}
				setSelectedRecording={setSelectedRecording}
				selectedRecording={selectedRecording}
			/>
			{selectedRecording === undefined ? null : (
				<p style={{ fontSize: 30, margin: 0, padding: "20px 0px" }}>
					{selectedRecording[0]}
				</p>
			)}
			<RecordingList selectedRecording={selectedRecording} />
		</div>
	);
}

async function getRecordings(
	database,
	userName,
	setRecordings,
	setSelectedRecording
) {
	const ref = collection(database, "readings", userName, "readings");
	const result = await getDocs(ref);
	const map = new Map();
	result.docs.forEach((item) => {
		const reading = item.data();
		if (!map.has(reading.item)) {
			map.set(reading.item, [reading]);
		} else {
			map.set(reading.item, [...map.get(reading.item), reading]);
		}
	});
	setSelectedRecording(map.entries().next().value);
	map.forEach((value, key) => {
		value.sort((a, b) => {
			return a.datetime - b.datetime;
		});
	});
	setRecordings(map);
}
