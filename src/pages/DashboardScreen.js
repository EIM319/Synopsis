import { doc, getDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";

export default function DashboardScreen({ database }) {
	const [userExists, setUserExists] = useState(undefined);
	const [name, setName] = useState("");

	let { userName } = useParams();

	useEffect(() => {
		getUser(database, userName, setUserExists, setName);
	}, []);

	if (userExists === undefined) {
		return (
			<div
				style={{
					height: "100vh",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	}

	if (!userExists) {
		return <Navigate to="/" />;
	}

	return <Navigate to={"/synopsis/" + userName} />;
}

async function getUser(database, userName, setUserExists, setName) {
	const ref = doc(database, "users", userName);
	const document = await getDoc(ref);
	setUserExists(document.exists());
	setName(document.data().name);
}
