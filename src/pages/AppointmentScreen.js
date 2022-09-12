import React from "react";
import { Container } from "react-bootstrap";
import { CgCalendarToday } from "react-icons/cg";

function AppointmentScreen({ appointments }) {
	const events = appointments.sort((a, b) => {
		return a.datetime - b.datetime;
	});

	return (
		<div style={{ width: "100%" }}>
			<div
				style={{
					background: "var(--accent)",
					color: "white",
					width: "100%",
					padding: 30,
				}}
			>
				<Container style={{ maxWidth: 1000 }}>
					<p className="sectionHeader">
						Upcoming Appointments <CgCalendarToday size={30} />
					</p>
					<p className="paragraph">
						For changes to appointment timing, please call{" "}
						<a href="tel:64722000" style={{ color: "white" }}>
							6472 2000
						</a>{" "}
						or email{" "}
						<a
							href="mailto:AH_appointment@nuhs.edu.sg"
							style={{ color: "white" }}
						>
							AH_appointment@nuhs.edu.sg
						</a>
						.
					</p>
				</Container>
			</div>
			<Container style={{ maxWidth: 1000, padding: 30 }}>
				<div style={{ paddingBottom: 50 }}>
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
		</div>
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
					<td>
						{" "}
						{date.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</td>
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
						{date.toDateString() +
							" " +
							date.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
					</p>
					<div
						className="line-horizontal"
						style={{ margin: "10px 0px 20px 0px" }}
					/>

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
