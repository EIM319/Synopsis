import React from "react";
import { Container } from "react-bootstrap";
import JsonData from "../mockdata/calendar_events.json";

function AppointmentScreen() {
	const DisplayData = JsonData.map((info) => {
<<<<<<< Updated upstream
		return (
			<tr>
				<td style={{ fontWeight: 500, fontSize: 17 }}>{info.title}</td>
				<td>{info.value}</td>
			</tr>
		);
=======
		info.forEach((item) => {
			return (
				<tr key={item}>
					<td style={{ fontWeight: 500, fontSize: 17 }}>{info.date}</td>
					<td>{info.name}</td>
					<td>{info.location}</td>
					<td>{info.doctor}</td>
					<td>{info.time}</td>
				</tr>
			);
		});
>>>>>>> Stashed changes
	});
	return (
		<Container style={{ padding: 20 }}>
			<p className="sectionHeader">Upcoming Appointments</p>
			<div>
				<table class="table table-striped">
					<tbody>{DisplayData}</tbody>
				</table>
			</div>
		</Container>
	);
}

export default AppointmentScreen;
