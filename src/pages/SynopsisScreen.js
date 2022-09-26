import {
	collection,
	getDocs,
	query,
	limit,
	orderBy,
	where,
	doc,
	getDoc,
	updateDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Offcanvas, Spinner } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import AdditionalNoteScreen from "./AdditionalNoteScreen";
import AppointmentScreen from "./AppointmentScreen";
import FaqScreen from "./FaqScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultScreen from "./LabResultScreen";
import MedicationScreen from "./MedicationScreen";
import ToDoListScreen from "./ToDoListScreen";
import { logEvent, setUserId } from "firebase/analytics";

export default function SynopsisScreen({ database, analytics }) {
	const [userName, setUserName] = useState(undefined);
	const [screenIndex, setScreenIndex] = useState(0);
	const [user, setUser] = useState(undefined);
	const [appointments, setAppointments] = useState([]);
	const [userExists, setUserExists] = useState(true);
	const [docId, setDocId] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		const temp = localStorage.getItem("userName");
		if (temp === undefined || temp === null) {
			setUserExists(false);
			return;
		}
		setUserId(analytics, temp);
		setUserName(temp);
		checkUser(database, temp, setUserExists);
		getUser(database, temp, setUser, setDocId);
		getAppointments(database, temp, setAppointments);
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

	if (user === null) {
		return (
			<div
				style={{
					width: "100%",
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				No Published Synopsis
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
						docId={docId}
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
				return <AppointmentScreen appointments={appointments} />; // Upcoming Appointments
			case 4:
				return <LabResultScreen labResult={user.lab_result} />; // Lab Results
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
				navigate={navigate}
				userName={userName}
				analytics={analytics}
			/>
			<div className="content">
				<Content />
			</div>
			<TopNavBar
				screenIndex={screenIndex}
				setScreenIndex={setScreenIndex}
				navigate={navigate}
				userName={userName}
				analytics={analytics}
			/>
		</div>
	);
}

var screenNames = [
	"To-Do",
	"Medication",
	"Articles",
	"Appointments",
	"Lab Results",
	"Care Staff's Comments",
	"FAQ",
];

function TopNavBar({
	screenIndex,
	setScreenIndex,
	navigate,
	userName,
	analytics,
}) {
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
						logEvent(analytics, "select_content", {
							content_type: "tab " + userName,
							item_id: i,
						});
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
				<Offcanvas.Body>
					{toggles}
					{/* <br />
					<Button
						variant="secondary"
						onClick={() => {
							navigate("/archive/" + userName);
						}}
					>
						View Archive
					</Button> */}
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

function SideNavBar({
	screenIndex,
	setScreenIndex,
	navigate,
	userName,
	analytics,
}) {
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
						logEvent(analytics, "select_content", {
							content_type: "tab " + userName,
							item_id: i,
						});
					}}
					key={i}
				>
					{screenNames[i]}
				</p>
			);
		}
	}
	return (
		<div className="hide-if-small sideNav">
			{toggles}
			{/* <br />
			<div>
				<Button
					className="sideNavText"
					variant="secondary"
					onClick={() => {
						navigate("/archive/" + userName);
					}}
				>
					View Archive
				</Button>
			</div> */}
		</div>
	);
}

// Data

async function checkUser(database, userName, setUserExists) {
	const ref = doc(database, "users", userName);
	const document = await getDoc(ref);
	setUserExists(document.exists());
}

async function getUser(database, userName, setUser, setDocId) {
	const archiveRef = collection(database, "users", userName, "archive");
	const q = query(archiveRef, orderBy("date", "desc"), limit(1));
	const docs = await getDocs(q);
	if (docs.docs.length <= 0) {
		setUser(null);
	} else {
		setUser(docs.docs[0].data());
		setDocId(docs.docs[0].id);
		checkRecordings(
			docs.docs[0].data(),
			setUser,
			database,
			userName,
			docs.docs[0].id
		);
	}
}

async function checkRecordings(user, setUser, database, userName, docId) {
	const archiveRef = doc(database, "users", userName, "archive", docId);
	if (user.last_recording !== undefined && user.last_recording !== null) {
		const date = user.last_recording.toDate();
		const today = new Date();
		date.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);
		if (today > date) {
			user.monitoring.forEach((article) => {
				if (
					article.recordings !== undefined &&
					article.recordings !== null
				) {
					article.recordings = null;
				}
			});
			console.log(user);
			user.medication.forEach((article) => {
				if (
					article.recordings !== undefined &&
					article.recordings !== null
				) {
					article.recordings = null;
				}
			});
			updateDoc(archiveRef, {
				monitoring: user.monitoring,
				medication: user.medication,
			});
			setUser(user);
		}
	}
	updateDoc(archiveRef, {
		last_recording: new Date(),
	});
}

async function getAppointments(database, userName, setAppointments) {
	const ref = collection(database, "appointments");
	const q = query(ref, where("user", "==", userName));
	const docs = await getDocs(q);
	if (docs.docs.length <= 0) {
		setAppointments([]);
	} else {
		setAppointments(docs.docs[0].data().appointments);
	}
}
