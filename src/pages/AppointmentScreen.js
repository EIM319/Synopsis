import React from "react";
import { Container } from "react-bootstrap";

function AppointmentScreen({ appointments }) {
	const events = appointments.sort((a, b) => {
		return a.datetime - b.datetime;
	});

	console.log(events);

	return (
		<Container style={{ padding: "20, 10, 20, 10" }}>
			<div style={{ maxWidth: 1000, paddingBottom: 50 }}>
				<p className="sectionHeader">Upcoming Appointments</p>
				<p className="paragraph">
					For changes to appointment timing, please call{" "}
					<a href="tel:64722000">6472 2000</a> or email{" "}
					<a href="mailto:AH_appointment@nuhs.edu.sg">
						AH_appointment@nuhs.edu.sg
					</a>
					.
				</p>
				<br />
				<div>
					<div className="appointmentTable">
						<AppointmentsTable events={events} />
					</div>
					<div className="appointmentCards">
						<AppointmentCards events={events} />
					</div>
				</div>
			</div>
		</Container>
	);
}

export default AppointmentScreen;

function AppointmentsTable({ events }) {
	const today = new Date();
	const DisplayData = events
		.filter((event) => {
			const date = event.datetime.toDate();
			return date >= today;
		})
		.map((info) => {
			const date = info.datetime.toDate();
			return (
				<tr>
					<td>{date.toDateString()}</td>
					<td> {date.toLocaleTimeString()}</td>
					<td>{info.name}</td>
					<td>{info.location}</td>
					<td>{info.doctor}</td>
					<td>{info.waiting_time}</td>
				</tr>
			);
		});

	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Date</th>
					<th>Time</th>
					<th>Purpose</th>
					<th>Location</th>
					<th>Doctor</th>
					<th>Waiting Time</th>
				</tr>
			</thead>
			<tbody>{DisplayData}</tbody>
		</table>
	);
}

function AppointmentCards({ events }) {
	const array = [];
	const today = new Date();
	events
		.filter((event) => {
			const date = event.datetime.toDate();
			return date >= today;
		})
		.forEach((event) => {
			const date = event.datetime.toDate();
			array.push(
				<div className="itemCard" style={{ padding: 20 }}>
					<p style={{ fontSize: 17, fontWeight: 500 }}>
						{event.name}
					</p>
					<p style={{ fontSize: 15 }}>
						{date.toDateString() + " " + date.toLocaleTimeString()}
					</p>
					<div className="line-horizontal" />

					<p style={{ fontSize: 15 }}>
						<b>Location: </b>
						{event.location}
					</p>
					<p style={{ fontSize: 15 }}>
						<b>Doctor: </b>
						{event.doctor}
					</p>
					<p style={{ fontSize: 15 }}>
						<b>Waiting Time: </b>
						{event.waiting_time}
					</p>
				</div>
			);
		});
	return array;
}
