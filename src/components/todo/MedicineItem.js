import { Badge } from "react-bootstrap";

export default function MedicineItem({
	todo: medicine,
	index,
	time,
	setSelectedMedicine,
	setOpenMedicineModal,
}) {
	var days = 0;
	medicine.days.forEach((val) => {
		if (val) days += 1;
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
				{medicine.extras.length > 0 ? (
					<ExtraBadges extras={medicine.extras} />
				) : null}
			</div>
		</div>
	);
}

function ExtraBadges({ extras }) {
	const array = [];
	extras.forEach((extra) => {
		array.push(
			<Badge
				bg="danger"
				style={{
					marginRight: 5,
					marginTop: 3,
					marginBottom: 3,
					maxWidth: 150,
					textOverflow: "ellipsis",
					overflow: "hidden",
				}}
			>
				{extra.header}
			</Badge>
		);
	});
	return (
		<div
			style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
		>
			{array}
		</div>
	);
}
