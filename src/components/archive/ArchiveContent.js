import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import AdditionalNoteScreen from "../../pages/AdditionalNoteScreen";
import CaregivingScreen from "../../pages/CaregivingScreen";
import FaqScreen from "../../pages/FaqScreen";
import HomeMonitoringScreen from "../../pages/HomeMonitoringScreen";
import LabResultScreen from "../../pages/LabResultScreen";
import MedicationScreen from "../../pages/MedicationScreen";

export default function ArchiveContent({ selectedArchive, archiveSelector }) {
	const [screenIndex, setScreenIndex] = useState(0);

	if (selectedArchive == null) {
		return <></>;
	}

	function Content() {
		switch (screenIndex) {
			case 0:
				return <MedicationScreen user={selectedArchive} />; // Medication
			case 1:
				return <HomeMonitoringScreen user={selectedArchive} />; // Home Monitoring
			case 2:
				return (
					<LabResultScreen labResult={selectedArchive.lab_result} />
				); // Lab Results
			case 3:
				return <CaregivingScreen user={selectedArchive} />; // Caregiving
			case 4:
				return (
					<AdditionalNoteScreen
						additionalNotes={selectedArchive.additional_notes}
					/>
				); // Additional Notes
			default:
				return <FaqScreen />; // FAQ
		}
	}

	return (
		<div className="synopsisPage" style={{ width: "100%" }}>
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
				selectedArchive={selectedArchive}
				archiveSelector={archiveSelector}
			/>
		</div>
	);
}

var screenNames = [
	"Medication",
	"Home Monitoring",
	"Lab Results",
	"Caregiving",
	"Care Staff's Comments",
	"Frequently Asked Questions",
];

function TopNavBar({
	screenIndex,
	setScreenIndex,
	selectedArchive,
	archiveSelector,
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
					}}
				>
					<p className="topNavText">{screenNames[i]}</p>
				</div>
			);
		}
	}
	return (
		<div className="topNav">
			<div
				style={{
					display: "flex",
					height: 60,
					width: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					padding: 20,
				}}
			>
				{selectedArchive == null ? (
					<b>Archive: "None selected"</b>
				) : (
					<b>
						Archive: {selectedArchive.date.toDate().toDateString()}{" "}
						{selectedArchive.date.toDate().toLocaleTimeString()}
					</b>
				)}
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
					<Offcanvas.Title>Archives</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div
						style={{
							padding: 20,
							background: "#F8F8F8",
							borderRadius: 10,
						}}
					>
						<p style={{ margin: 10, fontSize: 20 }}>
							Date of Archive
						</p>
						{archiveSelector}
					</div>
					<br />
					{toggles}
				</Offcanvas.Body>
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
	return <div className="sideNav">{toggles}</div>;
}
