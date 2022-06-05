import { Alert } from "react-bootstrap";
import mockCalendar from "../../mockdata/calendar_events.json";
import { monthNames } from "../commonValues";

export default function NextAppointmentAlert() {
	const today = new Date();

	const calendar = mockCalendar.events.sort((a, b) => {
		const aDate = a.date + a.month * 40 + a.year * 400;
		const bDate = b.date + b.month * 40 + b.year * 400;
		return aDate - bDate;
	});

	const nearest = calendar.find((event) => {
		if (event.year < today.getFullYear()) return false;
		if (event.month < today.getMonth()) return false;
		if (event.date < today.getDate()) return false;
		return true;
	});

	if (nearest === undefined) {
		return (
			<Alert style={{ width: "100%" }}>
				You have no upcoming events.
			</Alert>
		);
	}
	return (
		<Alert style={{ width: "100%" }}>
			Your next visit is {nearest.name} on{" "}
			{nearest.date +
				" " +
				monthNames[nearest.month] +
				" " +
				nearest.year}
		</Alert>
	);
}
