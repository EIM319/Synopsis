import { Badge } from "react-bootstrap";
import { CgPill } from "react-icons/cg";
import { Reading } from "./MonitoringItem";

export default function MedicineItem({
	medicine,
	index,
	setSelectedMedicine,
	setOpenMedicineModal,
	database,
	userName,
	timeSegment,
	docId,
	isToday,
}) {
	var days = 0;
	medicine.days.forEach((val) => {
		if (val) days += 1;
	});
	return (
		<div
			className="itemRow"
			key={"medicineitem" + index}
			style={{ padding: 10 }}
		>
			<div style={{ width: 30, margin: "10px 10px 0px 0px" }}>
				<CgPill size={25} />
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
					className="toggle"
					onClick={() => {
						setSelectedMedicine(medicine);
						setOpenMedicineModal(true);
					}}
				>
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
				<Reading
					monitoring={medicine}
					isToday={isToday}
					timeSegment={timeSegment}
					database={database}
					userName={userName}
					docId={docId}
					isArticle={false}
				/>
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
				key={extra.header}
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
