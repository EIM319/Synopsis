import { doc, getDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";

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

	return (
		<div
			style={{ display: "flex", flexDirection: "column", width: "100%" }}
		>
			<div style={{ background: "var(--accent)" }}>
				<Container
					style={{
						display: "flex",
						flexDirection: "column",
						padding: 40,
					}}
				>
					<b style={{ fontSize: 30, color: "white" }}>
						Hello {name}!
					</b>
					<p style={{ fontSize: 20, color: "white" }}>
						What can we do for you today?
					</p>
				</Container>
			</div>

			<Container
				style={{
					padding: 40,
				}}
			>
				<Link to={"/synopsis/" + userName}>
					<Button style={{ width: "100%", margin: 5 }}>
						View Synopsis
					</Button>
				</Link>
				<Link to={"/archive/" + userName}>
					<Button
						variant="secondary"
						style={{ width: "100%", margin: 5 }}
					>
						View Archive
					</Button>
				</Link>
			</Container>
		</div>
	);
}

async function getUser(database, userName, setUserExists, setName) {
	const ref = doc(database, "users", userName);
	const document = await getDoc(ref);
	setUserExists(document.exists());
	setName(document.data().name);
}
