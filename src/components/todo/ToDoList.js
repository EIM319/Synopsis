import { useEffect } from "react";
import { useState } from "react";
import MedicineItem from "./MedicineItem";
import MonitoringItem from "./MonitoringItem";
import { WiSunrise, WiMoonrise, WiStars, WiDaySunny } from "react-icons/wi";

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

	const itemArray = [[], [], [], [], [], [], [], []];
	const [hide, setHide] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const [past, setPast] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const [isToday, setToday] = useState(false);

	useEffect(() => {
		const dateToday = new Date();
		const newIsToday =
			date.getMonth() === dateToday.getMonth() &&
			date.getFullYear() === dateToday.getFullYear() &&
			date.getDate() === dateToday.getDate();
		setToday(newIsToday);

		const newArray = [
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
		];
		if (newIsToday) {
			const hour = dateToday.getHours();
			for (let i = 0; i <= 7; i++) {
				if (latestTime[i] != null && latestTime[i] < hour) {
					newArray[i] = true;
				}
			}
		}
		setHide(newArray);
		setPast(newArray);
	}, [date]);

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
						isToday={isToday}
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
					isToday={isToday}
				/>
			);
		}
	});

	function Section({ index }) {
		if (itemArray[index].length > 0) {
			if (past[index]) {
				return (
					<div
						style={{
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "#c5c5c5",
							borderRadius: 5,
							padding: 10,
							marginBottom: 10,
							background: "white",
							opacity: 0.5,
						}}
					>
						<b
							style={{ padding: 10, fontSize: 20 }}
							className="toggle"
							onClick={() => {
								const newArray = [...hide];
								newArray[index] = !hide[index];
								setHide(newArray);
								console.log(hide);
							}}
						>
							{timeText[index]} {timeIcon[index]}
						</b>
						{hide[index] ? null : (
							<>
								<div
									style={{
										height: 1,
										width: "100%",
										marginTop: 10,
										backgroundColor: "#c5c5c5",
									}}
								/>
								{itemArray[index]}
							</>
						)}
					</div>
				);
			}

			return (
				<div
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: "#c5c5c5",
						borderRadius: 5,
						padding: 10,
						marginBottom: 10,
						background: "white",
					}}
				>
					<b style={{ padding: 10, fontSize: 20 }}>
						{timeText[index]} {timeIcon[index]}
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
			<Section index={1} />
			<Section index={2} />
			<Section index={3} />
			<Section index={4} />
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

const timeIcon = [
	<WiSunrise size={24} />,
	<WiSunrise size={24} />,
	<WiDaySunny size={24} />,
	<WiDaySunny size={24} />,
	<WiMoonrise size={24} />,
	<WiMoonrise size={24} />,
	<WiStars size={24} />,
	null,
];

const latestTime = [10, 10, 14, 14, 21, 21, null, null];
