import { monthNames } from "../commonValues";
import mockCalendar from "../../mockdata/calendar_events.json";
import { useState } from "react";
import { MedicationModal } from "../medication/MedicationModal";
import { HomeMonitoringModal } from "../home_monitoring/HomeMonitoringModal";
import NextAppointmentAlert from "./NextAppointmentAlert";
import TodoList from "./ToDoList";
import ReadingsList from "./ReadingsList";

export default function TodoListComponent({
	date,
	setScreenIndex,
	user,
	userName,
	database,
}) {
	const [openMedicineModal, setOpenMedicineModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [openMonitoringModal, setOpenMonitoringModal] = useState(false);
	const [selectedMonitoring, setSelectedMonitoring] = useState(null);

	return (
		<div className="todoList">
			<NextAppointmentAlert />
			<p style={{ fontWeight: 500, fontSize: 27, paddingTop: 10 }}>
				{date.getDate() +
					" " +
					monthNames[date.getMonth()] +
					" " +
					date.getFullYear()}
			</p>
			<br />
			<ReadingsList user={user} database={database} userName={userName} />
			<EventList date={date} setScreenIndex={setScreenIndex} />
			<TodoList
				date={date}
				setSelectedMedicine={setSelectedMedicine}
				setOpenMedicineModal={setOpenMedicineModal}
				setSelectedMonitoring={setSelectedMonitoring}
				setOpenMonitoringModal={setOpenMonitoringModal}
				user={user}
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

function EventList({ date, setScreenIndex }) {
	const events = mockCalendar.events.filter(
		(item) =>
			item.date === date.getDate() &&
			item.month === date.getMonth() &&
			item.year === date.getFullYear()
	);
	if (events.length === 0) return null;
	const array = [];
	events.sort((e1, e2) => e1.hour + 60 * e1.min - (e2.hour + 60 * e2.min));
	events.forEach((event) => {
		var time = new Date();
		time.setHours(event.hour);
		time.setMinutes(event.min);
		var formattedTime = time.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		array.push(
			<div
				className="itemRow toggle"
				key={"event" + events.indexOf(event)}
				onClick={() => setScreenIndex(4)}
			>
				<p style={{ fontSize: 15, width: 130, color: "gray" }}>
					{formattedTime}
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
		<div className="itemCard" style={{ padding: 20 }}>
			<p className="header">Hospital Visits</p>
			<div className="line-horizontal" />
			{array}
		</div>
	);
}
