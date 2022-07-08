import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ArchiveContent from "../components/archive/ArchiveContent";

export default function ArchiveScreen({ database }) {
	const [userExists, setUserExists] = useState(true);
	const [archives, setArchives] = useState([]);
	const [selectedArchive, setSelectedArchive] = useState(null);

	let { userName } = useParams();

	useEffect(() => {
		getUser(database, userName, setUserExists);
		getArchives(database, userName, setArchives, setSelectedArchive);
	}, []);

	if (!userExists) {
		return <Navigate to="/" />;
	}

	function ArchiveList() {
		const array = [];
		archives.forEach((archive) => {
			array.push(
				<div
					className="toggle"
					style={{ width: "100%", padding: 10 }}
					onClick={() => {
						setSelectedArchive(archive);
					}}
				>
					{archive === selectedArchive ? (
						<b>
							{archive.date.toDate().toDateString()}{" "}
							{archive.date.toDate().toLocaleTimeString()}
						</b>
					) : (
						<p>
							{archive.date.toDate().toDateString()}{" "}
							{archive.date.toDate().toLocaleTimeString()}
						</p>
					)}
				</div>
			);
		});
		return array;
	}

	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<div className="sideNav" style={{ background: "#f0f0f0" }}>
				<ArchiveList />
			</div>
			<ArchiveContent
				selectedArchive={selectedArchive}
				archiveSelector={<ArchiveList />}
			/>
		</div>
	);
}

async function getUser(database, userName, setUserExists) {
	const ref = doc(database, "users", userName);
	const document = await getDoc(ref);
	setUserExists(document.exists());
}

async function getArchives(
	database,
	userName,
	setArchives,
	setSelectedArchive
) {
	const ref = collection(database, "users", userName, "archive");
	const q = query(ref, orderBy("date", "desc"));
	const list = await getDocs(q);
	const archives = [];
	list.docs.forEach((document) => {
		archives.push(document.data());
	});
	if (archives.length > 0) {
		setSelectedArchive(archives[0]);
	}
	setArchives(archives);
}
