import { useState } from "react";
import AdditionalNoteScreen from "./AdditionalNoteScreen";
import AppointmentScreen from "./AppointmentScreen";
import CaregivingScreen from "./CaregivingScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultScreen from "./LabResultScreen";
import MedicationScreen from "./MedicationScreen";
import ToDoListScreen from "./ToDoListScreen";

export default function SynopsisScreen() {
	const [screenIndex, setScreenIndex] = useState(0);

	return (
		<div className="synopsisPage">
			<TopNavBar
				screenIndex={screenIndex}
				setScreenIndex={setScreenIndex}
			/>
			<SideNavBar
				screenIndex={screenIndex}
				setScreenIndex={setScreenIndex}
			/>
			<div className="content">
				<Content screenIndex={screenIndex} />
			</div>
		</div>
	);
}

function Content({ screenIndex }) {
	switch (screenIndex) {
		case 0:
			return <ToDoListScreen />; // To-Do List
		case 1:
			return <HomeMonitoringScreen />; // Home Monitoring
		case 2:
			return <MedicationScreen />; // Medication
		case 3:
			return <LabResultScreen />; // Lab Results
		case 4:
			return <AppointmentScreen />; // Upcoming Appointments
		case 5:
			return <CaregivingScreen />; // Caregiving
		default:
			return <AdditionalNoteScreen />; // Additional Notes
	}
}

var screenNames = [
	"To-Do",
	"Home Monitoring",
	"Medication",
	"Lab Results",
	"Upcoming Appointments",
	"Caregiving",
	"Doctor's Comments",
];

function TopNavBar({ screenIndex, setScreenIndex }) {
	return <div className="hide-if-large topNav"></div>;
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
