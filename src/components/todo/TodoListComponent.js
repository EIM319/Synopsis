import { monthNames } from "../commonValues";
import mockCalendar from "../../mockdata/calendar_events.json";
import medication from "../../mockdata/medication.json";
import monitoring from "../../mockdata/monitoring.json";
import { useState } from "react";
import { MedicationModal } from "../medication/MedicationModal";
import { HomeMonitoringModal } from "../home_monitoring/HomeMonitoringModal";
import NextAppointmentAlert from "./NextAppointmentAlert";

export default function TodoListComponent({ date, setScreenIndex }) {
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
			<EventList date={date} setScreenIndex={setScreenIndex} />
			<TodoList
				date={date}
				setSelectedMedicine={setSelectedMedicine}
				setOpenMedicineModal={setOpenMedicineModal}
				setSelectedMonitoring={setSelectedMonitoring}
				setOpenMonitoringModal={setOpenMonitoringModal}
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

function TodoList({
	date,
	setSelectedMedicine,
	setOpenMedicineModal,
	setSelectedMonitoring,
	setOpenMonitoringModal,
}) {
	const medicines = getMedicines(date);
	const monitors = getMonitoring(date);
	const preBreakfast = [];
	const postBreakfast = [];
	const preLunch = [];
	const postLunch = [];
	const preDinner = [];
	const postDinner = [];
	const preSleep = [];
	medicines.forEach((todo) => {
		const index = medicines.indexOf(todo);
		if (todo.dosage_time[0]) {
			preBreakfast.push(
				<MedicineItem
					todo={todo}
					index={index}
					time="Before Breakfast"
					key={"Medicine " + index}
					setOpenMedicineModal={setOpenMedicineModal}
					setSelectedMedicine={setSelectedMedicine}
				/>
			);
		}
		if (todo.dosage_time[1]) {
			postBreakfast.push(
				<MedicineItem
					todo={todo}
					index={index}
					time="After Breakfast"
					key={"Medicine " + index}
					setOpenMedicineModal={setOpenMedicineModal}
					setSelectedMedicine={setSelectedMedicine}
				/>
			);
		}
		if (todo.dosage_time[2]) {
			preLunch.push(
				<MedicineItem
					todo={todo}
					index={index}
					time="Before Lunch"
					key={"Medicine " + index}
					setOpenMedicineModal={setOpenMedicineModal}
					setSelectedMedicine={setSelectedMedicine}
				/>
			);
		}
		if (todo.dosage_time[3]) {
			postLunch.push(
				<MedicineItem
					todo={todo}
					index={index}
					time="After Lunch"
					key={"Medicine " + index}
					setOpenMedicineModal={setOpenMedicineModal}
					setSelectedMedicine={setSelectedMedicine}
				/>
			);
		}
		if (todo.dosage_time[4]) {
			preDinner.push(
				<MedicineItem
					todo={todo}
					index={index}
					time="Before Dinner"
					key={"Medicine " + index}
					setOpenMedicineModal={setOpenMedicineModal}
					setSelectedMedicine={setSelectedMedicine}
				/>
			);
		}
		if (todo.dosage_time[5]) {
			postDinner.push(
				<MedicineItem
					todo={todo}
					index={index}
					time="After Dinner"
					key={"Medicine " + index}
					setOpenMedicineModal={setOpenMedicineModal}
					setSelectedMedicine={setSelectedMedicine}
				/>
			);
		}
		if (todo.dosage_time[6]) {
			postDinner.push(
				<MedicineItem
					todo={todo}
					index={index}
					time="Before Sleep"
					key={"Medicine " + index}
					setOpenMedicineModal={setOpenMedicineModal}
					setSelectedMedicine={setSelectedMedicine}
				/>
			);
		}
	});

	monitors.forEach((todo) => {
		const index = monitors.indexOf(todo);
		if (todo.time[0]) {
			preBreakfast.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="Before Breakfast"
					key={"monitors " + index}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
		if (todo.time[1]) {
			postBreakfast.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="After Breakfast"
					key={"monitors " + index}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
		if (todo.time[2]) {
			preLunch.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="Before Lunch"
					key={"monitors " + index}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
		if (todo.time[3]) {
			postLunch.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="After Lunch"
					key={"monitors " + index}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
		if (todo.time[4]) {
			preDinner.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="Before Dinner"
					key={"monitors " + index}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
		if (todo.time[5]) {
			postDinner.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="After Dinner"
					key={"monitors " + index}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
		if (todo.time[6]) {
			postDinner.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="Before Sleep"
					key={"monitors " + index}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
	});

	return (
		<div className="itemCard" style={{ padding: 20 }}>
			<p className="header">Medication {"&"} To-Dos</p>
			<div className="line-horizontal" />
			{preBreakfast}
			<p
				style={{
					fontSize: 17,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
					padding: 20,
				}}
			>
				--- Breakfast ---
			</p>
			{postBreakfast}
			{preLunch}
			<p
				style={{
					fontSize: 17,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
					padding: 20,
				}}
			>
				--- Lunch ---
			</p>
			{postLunch}
			{preDinner}
			<p
				style={{
					fontSize: 17,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
					padding: 20,
				}}
			>
				--- Dinner ---
			</p>
			{postDinner}
			{preSleep}
		</div>
	);
}

function MedicineItem({
	todo: medicine,
	index,
	time,
	setSelectedMedicine,
	setOpenMedicineModal,
}) {
	var days = 0;
	medicine.dosage_days.forEach((val) => {
		if (val === 1) days += 1;
	});
	return (
		<div
			className="itemRow toggle"
			key={"medicineitem" + index}
			onClick={() => {
				setSelectedMedicine(medicine);
				setOpenMedicineModal(true);
			}}
		>
			<p style={{ fontSize: 15, width: 130, color: "gray" }}>{time}</p>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<p
					style={{
						fontSize: 17,
						fontWeight: 500,
						color: days < 4 ? "rgb(223, 28, 28)" : "",
					}}
				>
					{medicine.name}
				</p>
				<p style={{ fontSize: 15 }}>{medicine.purpose}</p>
			</div>
		</div>
	);
}

function MonitoringItem({
	todo: monitoring,
	index,
	time,
	setSelectedMonitoring,
	setOpenMonitoringModal,
}) {
	return (
		<div
			className="itemRow toggle"
			key={"monitoringitem" + index}
			onClick={() => {
				setSelectedMonitoring(monitoring);
				setOpenMonitoringModal(true);
			}}
		>
			<p style={{ fontSize: 15, width: 130, color: "gray" }}>{time}</p>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<p style={{ fontSize: 17, fontWeight: 500 }}>
					{monitoring.purpose}
				</p>
				<p style={{ fontSize: 15 }}>{monitoring.name}</p>
			</div>
		</div>
	);
}

function getMedicines(date) {
	var day = date.getDay();
	return medication.medication.filter((item) => item.dosage_days[day] === 1);
}

function getMonitoring(date) {
	var day = date.getDay();
	return monitoring.monitoring.filter((item) => item.days[day] === 1);
}
