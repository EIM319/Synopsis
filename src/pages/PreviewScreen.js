import {
	collection,
	getDocs,
	query,
	where,
	doc,
	getDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Offcanvas, Spinner } from "react-bootstrap";

import AdditionalNoteScreen from "./AdditionalNoteScreen";
import AppointmentScreen from "./AppointmentScreen";
import FaqScreen from "./FaqScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultScreen from "./LabResultScreen";
import MedicationScreen from "./MedicationScreen";
import ToDoListScreen from "./ToDoListScreen";
import { AiOutlineMenu } from "react-icons/ai";

export default function PreviewScreen({ database }) {
	const [userExists, setUserExists] = useState(true);
	const [user, setUser] = useState(undefined);
	const [appointments, setAppointments] = useState([]);
	const [screenIndex, setScreenIndex] = useState(0);

	let { userName } = useParams();

	useEffect(() => {
		checkUser(database, userName, setUserExists, setUser);
		getAppointmenets(database, userName, setAppointments);
	}, []);

	if (!userExists) {
		return <Navigate to="/" />;
	}

	if (user === undefined) {
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

	function Content() {
		switch (screenIndex) {
			case 0:
				return (
					<ToDoListScreen
						setScreenIndex={setScreenIndex}
						user={user}
						userName={userName}
						appointments={appointments}
						database={database}
					/>
				); // To-Do List
			case 1:
				return <MedicationScreen user={user} />; // Medication
			case 2:
				return (
					<HomeMonitoringScreen
						user={user}
						database={database}
						userName={userName}
					/>
				); // Home Monitoring
			case 3:
				return <LabResultScreen labResult={user.lab_result} />; // Lab Results
			case 4:
				return <AppointmentScreen appointments={appointments} />; // Upcoming Appointments
			case 5:
				return (
					<AdditionalNoteScreen
						additionalNotes={user.additional_notes}
					/>
				); // Additional Notes
			default:
				return <FaqScreen />; // FAQ
		}
	}

	return (
		<div className="synopsisPage">
			<SideNavBar
				screenIndex={screenIndex}
				setScreenIndex={setScreenIndex}
			/>
			<div className="content">
				<Content />
			</div>
			<TopNavBar
				screenIndex={screenIndex}
				setScreenIndex={setScreenIndex}
			/>
		</div>
	);
}

var screenNames = [
	"To-Do",
	"Medication",
	"Home Monitoring",
	"Lab Results",
	"Upcoming Appointments",
	"Care Staff's Comments",
	"Frequently Asked Questions",
];

function TopNavBar({ screenIndex, setScreenIndex }) {
	const [showOffCanvas, setShowOffCanvas] = useState(false);
	var toggles = [];
	for (let i = 0; i < screenNames.length; i++) {
		if (i === screenIndex) {
			toggles.push(
				<div className="topNavToggle active" key={"Option" + i}>
					<p className="topNavText">{screenNames[i]}</p>
				</div>
			);
		} else {
			toggles.push(
				<div
					className="topNavToggle"
					key={"Option" + i}
					onClick={() => {
						setShowOffCanvas(false);
						setScreenIndex(i);
					}}
				>
					<p className="topNavText">{screenNames[i]}</p>
				</div>
			);
		}
	}
	return (
		<div className="hide-if-large topNav">
			<div
				style={{
					display: "flex",
					height: 60,
					width: "100%",
					justifyContent: "end",
					alignItems: "center",
					paddingRight: 20,
				}}
			>
				<AiOutlineMenu
					size={30}
					onClick={() => {
						setShowOffCanvas(!showOffCanvas);
					}}
				/>
			</div>
			<Offcanvas
				show={showOffCanvas}
				onHide={() => setShowOffCanvas(false)}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Synopsis</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>{toggles}</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

function SideNavBar({ screenIndex, setScreenIndex }) {
	var toggles = [];
	for (let i = 0; i < screenNames.length; i++) {
		if (i === screenIndex) {
			toggles.push(
				<p className="sideNavText active" key={i}>
					{screenNames[i]}
				</p>
			);
		} else {
			toggles.push(
				<p
					className="sideNavText"
					onClick={() => {
						setScreenIndex(i);
					}}
					key={i}
				>
					{screenNames[i]}
				</p>
			);
		}
	}
	return <div className="hide-if-small sideNav">{toggles}</div>;
}

// Data

async function checkUser(database, userName, setUserExists, setUser) {
	const ref = doc(database, "users", userName);
	const document = await getDoc(ref);
	setUserExists(document.exists());
	if (document.exists()) {
		setUser(document.data());
	}
}

async function getAppointmenets(database, userName, setAppointments) {
	const ref = collection(database, "appointments");
	const q = query(ref, where("user", "==", userName));
	const docs = await getDocs(q);
	if (docs.docs.length <= 0) {
		setAppointments([]);
	} else {
		setAppointments(docs.docs[0].data().appointments);
	}
}
