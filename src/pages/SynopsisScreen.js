import { useState } from "react";

export default function SynopsisScreen() {
	const [screenIndex, setScreenIndex] = useState(0);

	return (
		<div className="SynopsisPage">
			<div className="hide-if-large TopNav"></div>
			<div className="hide-if-small SideNav"></div>
			<div className="Content">
				<Content screenIndex={screenIndex} />
			</div>
		</div>
	);
}

function Content({ screenIndex }) {
	switch (screenIndex) {
		case 0:
			return <></>; // To-Do List
		case 1:
			return <></>; // Home Monitoring
		case 2:
			return <></>; // Medication
		case 3:
			return <></>; // Lab Results
		case 4:
			return <></>; // Upcoming Appointments
		case 5:
			return <></>; // Caregiving
		default:
			return <></>; // Additional Notes
	}
}
