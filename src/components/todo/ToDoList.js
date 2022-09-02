import MedicineItem from "./MedicineItem";
import MonitoringItem from "./MonitoringItem";

export default function TodoList({
	user,
	userName,
	database,
	date,
	setSelectedMedicine,
	setOpenMedicineModal,
	setSelectedMonitoring,
	setOpenMonitoringModal,
}) {
	const medicines = getMedicines(date, user);
	const monitors = getMonitoring(date, user);
	const preBreakfast = [];
	const postBreakfast = [];
	const preLunch = [];
	const postLunch = [];
	const preDinner = [];
	const postDinner = [];
	const preSleep = [];
	medicines.forEach((todo) => {
		const index = medicines.indexOf(todo);
		if (todo.time[0]) {
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
		if (todo.time[1]) {
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
		if (todo.time[2]) {
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
		if (todo.time[3]) {
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
		if (todo.time[4]) {
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
		if (todo.time[5]) {
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
		if (todo.time[6]) {
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
		if (!todo.isMonitoring) return;
		if (todo.time[0]) {
			preBreakfast.push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="Before Breakfast"
					key={"monitors " + index}
					database={database}
					userName={userName}
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
					database={database}
					userName={userName}
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
					database={database}
					userName={userName}
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
					database={database}
					userName={userName}
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
					database={database}
					userName={userName}
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
					database={database}
					userName={userName}
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
					database={database}
					userName={userName}
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

function getMedicines(date, user) {
	var day = date.getDay();
	return user.medication.filter((item) => item.days[day]);
}

function getMonitoring(date, user) {
	var day = date.getDay();
	return user.monitoring.filter((item) => item.days[day]);
}
