import React from "react";
import { Container } from "react-bootstrap";
import JsonData from "../mockdata/table.json";

function AppointmentScreen() {
	const DisplayData = JsonData.map((info) => {
		return (
			<tr>
				<td style={{ fontWeight: 500, fontSize: 17 }}>{info.title}</td>
				<td>{info.value}</td>
			</tr>
		);
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
