import { monthNames } from "../commonValues";
import { useState } from "react";
import { MedicationModal } from "../medication/MedicationModal";
import { HomeMonitoringModal } from "../home_monitoring/HomeMonitoringModal";
import NextAppointmentAlert from "./NextAppointmentAlert";
import TodoList from "./ToDoList";

export default function TodoListComponent({
	date,
	setScreenIndex,
	user,
	userName,
	database,
	appointments,
}) {
	const [openMedicineModal, setOpenMedicineModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [openMonitoringModal, setOpenMonitoringModal] = useState(false);
	const [selectedMonitoring, setSelectedMonitoring] = useState(null);

	return (
		<div className="todoList">
			<NextAppointmentAlert appointments={appointments} />
			<p style={{ fontWeight: 600, fontSize: 30, paddingTop: 30 }}>
				{date.getDate() +
					" " +
					monthNames[date.getMonth()] +
					" " +
					date.getFullYear()}
			</p>
			<br />
			<EventList
				date={date}
				setScreenIndex={setScreenIndex}
				appointments={appointments}
			/>
			<TodoList
				date={date}
				setSelectedMedicine={setSelectedMedicine}
				setOpenMedicineModal={setOpenMedicineModal}
				setSelectedMonitoring={setSelectedMonitoring}
				setOpenMonitoringModal={setOpenMonitoringModal}
				user={user}
				database={database}
				userName={userName}
			/>
			<MedicationModal
				medicine={selectedMedicine}
				openModal={openMedicineModal}
				setOpenModal={setOpenMedicineModal}
			/>
			<HomeMonitoringModal
				monitor={selectedMonitoring}
				openModal={openMonitoringModal}
				setOpenModal={setOpenMonitoringModal}
			/>
		</div>
	);
}

function EventList({ date, setScreenIndex, appointments }) {
	const events = appointments.filter((item) => {
		const eventDate = item.datetime.toDate();
		return (
			eventDate.getDate() === date.getDate() &&
			eventDate.getMonth() === date.getMonth() &&
			eventDate.getFullYear() === date.getFullYear()
		);
	});
	if (events.length === 0) return null;
	const array = [];
	events.sort((e1, e2) => e1.hour + 60 * e1.min - (e2.hour + 60 * e2.min));
	events.forEach((event) => {
		const eventDate = event.datetime.toDate();
		array.push(
			<div
				className="itemRow toggle"
				key={"event" + events.indexOf(event)}
				onClick={() => setScreenIndex(4)}
			>
				<p style={{ fontSize: 15, width: 100, color: "gray" }}>
					{eventDate.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
				<div className="itemColumn">
					<p style={{ fontSize: 17, fontWeight: 500 }}>
						{event.name}
					</p>
					<p style={{ fontSize: 15 }}>{event.location}</p>
				</div>
			</div>
		);
	});
	return (
		<>
			<div className="itemCard" style={{ padding: 20 }}>
				<p className="header">Hospital Visits</p>
				<div
					className="line-horizontal"
					style={{ margin: "10px 0px 20px 0px" }}
				/>
				{array}
			</div>
			<br />
		</>
	);
}
