import React from "react";
import { Container } from "react-bootstrap";
import { monthNames } from "../components/commonValues";
import JsonData from "../mockdata/calendar_events.json";

function AppointmentScreen() {
	const events = JsonData.events.sort((a, b) => {
		const aDate = a.date + a.month * 40 + a.year * 400;
		const bDate = b.date + b.month * 40 + b.year * 400;
		return aDate - bDate;
	});

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
			if (event.year < today.getFullYear()) return false;
			if (event.month < today.getMonth()) return false;
			if (event.date < today.getDate()) return false;
			return true;
		})
		.map((info) => {
			return (
				<tr>
					<td>
						{info.date +
							" " +
							monthNames[info.month] +
							" " +
							info.year}
						<br />
						{"(" + info.day + ")"}
					</td>
					<td>{info.hour + ":" + info.min + " " + info.period}</td>
					<td>{info.name}</td>
					<td>{info.location}</td>
					<td>{info.doctor}</td>
					<td>{info.time}</td>
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
			if (event.year < today.getFullYear()) return false;
			if (event.month < today.getMonth()) return false;
			if (event.date < today.getDate()) return false;
			return true;
		})
		.forEach((event) => {
			array.push(
				<div className="itemCard" style={{ padding: 20 }}>
					<p style={{ fontSize: 17, fontWeight: 500 }}>
						{event.name}
					</p>
					<p style={{ fontSize: 15 }}>
						{event.date +
							" " +
							monthNames[event.month] +
							" " +
							event.year}
						{" (" + event.day + ")"}{" "}
						{event.hour + ":" + event.min + " " + event.period}
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
						{event.time}
					</p>
				</div>
			);
		});
	return array;
}
