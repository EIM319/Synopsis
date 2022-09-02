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

	const itemArray = [[], [], [], [], [], [], [], []];

	const timeText = [
		"Before Breakfast",
		"After Breakfast",
		"Before Lunch",
		"After Lunch",
		"Before Dinner",
		"After Dinner",
		"Before Sleep",
		"Any Time",
	];

	medicines.forEach((todo) => {
		const index = medicines.indexOf(todo);
		for (let i = 0; i <= 6; i++) {
			if (todo.time[i]) {
				itemArray[i].push(
					<MedicineItem
						todo={todo}
						index={index}
						time={timeText[i]}
						key={"Medicine " + index}
						setOpenMedicineModal={setOpenMedicineModal}
						setSelectedMedicine={setSelectedMedicine}
					/>
				);
			}
		}
	});

	monitors.forEach((todo) => {
		if (!todo.isMonitoring) return;
		const index = monitors.indexOf(todo);
		var hasDay = false;
		for (let i = 0; i <= 6; i++) {
			if (todo.time[i]) {
				hasDay = true;
				itemArray[i].push(
					<MonitoringItem
						todo={todo}
						index={index}
						time={timeText[i]}
						key={"monitors " + index}
						database={database}
						userName={userName}
						setOpenMonitoringModal={setOpenMonitoringModal}
						setSelectedMonitoring={setSelectedMonitoring}
					/>
				);
			}
		}
		if (!hasDay) {
			itemArray[7].push(
				<MonitoringItem
					todo={todo}
					index={index}
					time="Any time"
					key={"monitors " + index}
					database={database}
					userName={userName}
					setOpenMonitoringModal={setOpenMonitoringModal}
					setSelectedMonitoring={setSelectedMonitoring}
				/>
			);
		}
	});

	function Section({ index }) {
		if (itemArray[index].length > 0) {
			return (
				<div
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: "#c5c5c5",
						borderRadius: 10,
						padding: 10,
						marginBottom: 10,
					}}
				>
					<b style={{ padding: 10, fontSize: 20 }}>
						{timeText[index]}
					</b>
					<div
						style={{
							height: 1,
							width: "100%",
							marginTop: 10,
							backgroundColor: "#c5c5c5",
						}}
					/>
					{itemArray[index]}
				</div>
			);
		}
		return null;
	}

	return (
		<div className="itemCard" style={{ padding: 20 }}>
			<p className="header">Medication {"&"} To-Dos</p>
			<div className="line-horizontal" />
			<Section index={7} />
			<Section index={0} />
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
			<Section index={1} />
			<Section index={2} />
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
			<Section index={3} />
			<Section index={4} />
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
			<Section index={5} />
			<Section index={6} />
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
