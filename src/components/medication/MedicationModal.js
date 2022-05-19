import { Col, Container, Image, Row, Modal, Table } from "react-bootstrap";

export function MedicationModal({ openModal, setOpenModal, medicine }) {
	return (
		<Modal show={openModal} onHide={() => setOpenModal(false)} centered>
			<Row style={{ padding: 20 }}>
				<Col xs={6}>
					<p style={{ fontSize: 23, fontWeight: 500 }}>
						{medicine.name}
					</p>
					<p style={{ fontSize: 17 }}>{medicine.purpose}</p>
				</Col>
				<Col
					xs={6}
					style={{ display: "flex", justifyContent: "center" }}
				>
					<Image
						src={medicine.image}
						style={{
							width: 100,
							aspectRatio: 1,
							objectFit: "contain",
						}}
					/>
				</Col>
			</Row>
			<Row style={{ paddingLeft: 20, paddingRight: 20 }}>
				<p style={{ fontWeight: 700, fontSize: 17 }}>Dosage</p>
				<TimingText medicine={medicine} />
				<DayText medicine={medicine} />
			</Row>
			<Row
				style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}
			>
				<p style={{ fontWeight: 700, fontSize: 17 }}>Side Effects</p>
				<SideEffects medicine={medicine} />
			</Row>
		</Modal>
	);
}

function TimingText({ medicine }) {
	const array = [];
	if (medicine.dosage_time[0] === 1) {
		array.push(<p key={"timing 0"}>Before Breakfast</p>);
	}
	if (medicine.dosage_time[1] === 1) {
		array.push(<p key={"timing 1"}>After Breakfast</p>);
	}
	if (medicine.dosage_time[2] === 1) {
		array.push(<p key={"timing 2"}>Before Lunch</p>);
	}
	if (medicine.dosage_time[3] === 1) {
		array.push(<p key={"timing 3"}>After Lunch</p>);
	}
	if (medicine.dosage_time[4] === 1) {
		array.push(<p key={"timing 4"}>Before Dinner</p>);
	}
	if (medicine.dosage_time[5] === 1) {
		array.push(<p key={"timing 5"}>After Dinner</p>);
	}
	if (medicine.dosage_time[6] === 1) {
		array.push(<p key={"timing 6"}>Before Sleep</p>);
	}
	return array;
}

function DayText({ medicine }) {
	return (
		<div style={{ padding: 10 }}>
			<Table bordered>
				<thead>
					<tr style={{ textAlign: "center" }}>
						<th>SUN</th>
						<th>MON</th>
						<th>TUE</th>
						<th>WED</th>
						<th>THU</th>
						<th>FRI</th>
						<th>SAT</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ textAlign: "center" }}>
						<th>{medicine.dosage_days[0] ? "✓" : ""}</th>
						<th>{medicine.dosage_days[1] ? "✓" : ""}</th>
						<th>{medicine.dosage_days[2] ? "✓" : ""}</th>
						<th>{medicine.dosage_days[3] ? "✓" : ""}</th>
						<th>{medicine.dosage_days[4] ? "✓" : ""}</th>
						<th>{medicine.dosage_days[5] ? "✓" : ""}</th>
						<th>{medicine.dosage_days[6] ? "✓" : ""}</th>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

function SideEffects({ medicine }) {
	const array = [];
	if (medicine.side_effects.length > 0) {
		array.push(
			<p
				key={"SideEffect Header"}
				style={{ fontStyle: "italic", paddingBottom: 10 }}
			>
				You may experience some of these side effects after consuming
				this medication. Please inform the doctor if you encounter any
				of these symptoms.
			</p>
		);
		medicine.side_effects.forEach((sideEffect) => {
			array.push(
				<p
					key={
						"SideEffect " +
						medicine.side_effects.indexOf(sideEffect)
					}
				>
					- {sideEffect}
				</p>
			);
		});
	}

	return array;
}
