import { doc, getDoc } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Offcanvas, Spinner } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import AdditionalNoteScreen from "./AdditionalNoteScreen";
import AppointmentScreen from "./AppointmentScreen";
import CaregivingScreen from "./CaregivingScreen";
import FaqScreen from "./FaqScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultScreen from "./LabResultScreen";
import MedicationScreen from "./MedicationScreen";
import ToDoListScreen from "./ToDoListScreen";

const userName = "iCgfe1IHSfDNRC3hfgxF";

export default function SynopsisScreen({ database }) {
	const [screenIndex, setScreenIndex] = useState(0);
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		getUser({ database, setMedication: setUser });
	}, []);

	if (user === undefined) {
		return (
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		);
	}

	function Content() {
		switch (screenIndex) {
			case 0:
				return (
					<ToDoListScreen
						setScreenIndex={setScreenIndex}
						user={user}
					/>
				); // To-Do List
			case 1:
				return <MedicationScreen user={user} />; // Medication
			case 2:
				return <HomeMonitoringScreen />; // Home Monitoring
			case 3:
				return <LabResultScreen />; // Lab Results
			case 4:
				return <AppointmentScreen />; // Upcoming Appointments
			case 5:
				return <CaregivingScreen />; // Caregiving
			case 6:
				return <AdditionalNoteScreen />; // Additional Notes
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
	"Caregiving",
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
async function getUser({ database, setMedication }) {
	const ref = doc(database, "users", userName);
	const data = await getDoc(ref);
	setMedication(data.data());
}
