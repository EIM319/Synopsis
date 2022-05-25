import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import AdditionalNoteScreen from "./AdditionalNoteScreen";
import AppointmentScreen from "./AppointmentScreen";
import CaregivingScreen from "./CaregivingScreen";
import FaqScreen from "./FaqScreen";
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
				<Content
					screenIndex={screenIndex}
					setScreenIndex={setScreenIndex}
				/>
			</div>
		</div>
	);
}

function Content({ screenIndex, setScreenIndex }) {
	switch (screenIndex) {
		case 0:
			return <ToDoListScreen setScreenIndex={setScreenIndex} />; // To-Do List
		case 1:
			return <MedicationScreen />; // Medication
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

var screenNames = [
	"To-Do",
	"Medication",
	"Home Monitoring",
	"Lab Results",
	"Upcoming Appointments",
	"Caregiving",
	"Doctor's Comments",
	"Frequently Asked Questions",
];

function TopNavBar({ screenIndex, setScreenIndex }) {
	const [showDropDown, setShowDropDown] = useState(false);
	var toggles = [];
	for (let i = 0; i < screenNames.length; i++) {
		if (i === screenIndex) {
			toggles.push(
				<div className="dropdownTopNavToggle active" key={"Option" + i}>
					<p className="topNavText">{screenNames[i]}</p>
				</div>
			);
		} else {
			toggles.push(
				<div
					className="dropdownTopNavToggle"
					key={"Option" + i}
					onClick={() => {
						setShowDropDown(false);
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
						setShowDropDown(!showDropDown);
					}}
				/>
			</div>
			<div
				className="dropdownTopNav"
				style={
					showDropDown ? { display: "block" } : { display: "none" }
				}
			>
				{toggles}
			</div>
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
