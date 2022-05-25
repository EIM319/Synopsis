import { monthNames } from "../commonValues";
import mockCalendar from "../../mockdata/calendar_events.json";
import medication from "../../mockdata/medication.json";
import monitoring from "../../mockdata/monitoring.json";
import { useState } from "react";
import { MedicationModal } from "../medication/MedicationModal";
import { HomeMonitoringModal } from "../medication/HomeMonitoringModal";

export default function TodoListComponent({ date, setScreenIndex }) {
	const [openMedicineModal, setOpenMedicineModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [openMonitoringModal, setOpenMonitoringModal] = useState(false); 
	const [selectedMonitoring, setSelectedMonitoring] = useState(null);

	return (
		<div className="todoList">
			<p style={{ fontWeight: 500, fontSize: 15 }}>
				{date.getDate() +
					" " +
					monthNames[date.getMonth()] +
					" " +
					date.getFullYear()}
			</p>
			<EventList date={date} setScreenIndex={setScreenIndex} />
			<TodoList
				date={date}
				setSelectedMedicine={setSelectedMedicine}
				setOpenMedicineModal={setOpenMedicineModal}
				setSelectedMonitoring = {setSelectedMonitoring}
				setOpenMonitoringModal = {setOpenMonitoringModal}
			/>
			<MedicationModal
				medicine={selectedMedicine}
				openModal={openMedicineModal}
				setOpenModal={setOpenMedicineModal}
			/>
			<HomeMonitoringModal 
				monitor = {selectedMonitoring}
				openModal = {openMonitoringModal}
				setOpenModal = {setOpenMonitoringModal}
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
					<p style={{ fontSize: 13 }}>{event.location}</p>
				</div>
			</div>
		);
	});
	return (
		<div className="itemCard" style={{ padding: 20 }}>
			<p className="header">Events</p>
			<div className="line-horizontal" />
			{array}
		</div>
	);
}

function TodoList({ date, setSelectedMedicine, setOpenMedicineModal, setSelectedMonitoring, setOpenMonitoringModal }) {
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
					key="Todo 0"
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
					key="Todo 1"
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
					key="Todo 2"
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
					key="Todo 3"
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
					key="Todo 4"
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
					key="Todo 5"
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
					key="Todo 6"
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
					key="Todo 0"
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
					key="Todo 1"
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
					key="Todo 2"
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
					key="Todo 3"
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
					key="Todo 4"
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
					key="Todo 5"
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
					key="Todo 6"
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
	});

	return (
		<div className="itemCard" style={{ padding: 20 }}>
			<p className="header">Medication {"&"} ToDos</p>
			<div className="line-horizontal" />
			{preBreakfast}
			<p
				style={{
					fontSize: 17,
					textAlign: "center",
					width: "100%",
					opacity: 0.5,
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
	todo,
	index,
	time,
	setSelectedMedicine,
	setOpenMedicineModal,
}) {
	return (
		<div
			className="itemRow toggle"
			key={"todo" + index}
			onClick={() => {
				setSelectedMedicine(todo);
				setOpenMedicineModal(true);
			}}
		>
			<p style={{ fontSize: 15, width: 130, color: "gray" }}>{time}</p>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<p style={{ fontSize: 17, fontWeight: 500 }}>{todo.name}</p>
				<p style={{ fontSize: 13 }}>{todo.purpose}</p>
			</div>
		</div>
	);
}

function MonitoringItem({
	todo,
	index, 
	time, 
	setSelectedMonitoring, 
	setOpenMonitoringModal,
}) {
	return (
		<div 
		className = "itemRow toggle"
		key={"todo" + index}
		onClick={() => {
			setSelectedMonitoring(todo); 
			setOpenMonitoringModal(true); 
		}}
		>
			<p style={{ fontSize: 15, width: 130, color: "gray" }}>{time}</p>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<p style={{ fontSize: 17, fontWeight: 500 }}>{todo.purpose}</p>
				<p style={{ fontSize: 13 }}>{todo.name}</p>
			</div>
		</div>

	);
}

function getMedicines(date) {
	var day = date.getDay();
	return medication.medication.filter((item) => item.dosage_days[day] === 1);
}

function getMonitoring(date){
	var day = date.getDay(); 
	return monitoring.monitoring.filter((item) => item.days[day] === 1);
}
