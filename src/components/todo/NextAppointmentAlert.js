import { Alert } from "react-bootstrap";

export default function NextAppointmentAlert({ appointments }) {
	const calendar = appointments.sort((a, b) => {
		return a.datetime - b.datetime;
	});

	const nearest = calendar.find((event) => {
		const today = new Date();
		const eventDate = event.datetime.toDate();
		return eventDate >= today;
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
			{nearest.datetime.toDate().toDateString()}
		</Alert>
	);
}
