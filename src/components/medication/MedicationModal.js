import { Col, Image, Row, Modal, Table } from "react-bootstrap";

export function MedicationModal({ openModal, setOpenModal, medicine }) {
	if (medicine === null) return null;
	return (
		<Modal show={openModal} onHide={() => setOpenModal(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title>{medicine.name}</Modal.Title>
			</Modal.Header>
			<Row style={{ padding: 20 }}>
				{/* <Col xs={6}> */}
				<p style={{ fontSize: 17 }}>{medicine.purpose}</p>
				{/* </Col> */}
				{/* <Col
					xs={6}
					style={{ display: "flex", justifyContent: "center" }}
				>
					<Image
						src={medicine.image}
						style={{
							width: 100,
							height: 100,
							objectFit: "contain",
						}}
					/>
				</Col> */}
			</Row>
			<Row style={{ paddingLeft: 20, paddingRight: 20 }}>
				<p style={{ fontWeight: 700, fontSize: 17 }}>Dosage</p>
				<p style={{ fontWeight: 500, fontSize: 13 }}>
					{medicine.dosage} {timingText(medicine)}
				</p>
				<DayText medicine={medicine} />
			</Row>
			<Row
				style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}
			>
				<p style={{ fontWeight: 700, fontSize: 17 }}>Side Effects</p>
				<SideEffects medicine={medicine} />
			</Row>
			{medicine.extras.length > 0 ? (
				<Row
					style={{
						paddingLeft: 20,
						paddingRight: 20,
						paddingBottom: 20,
					}}
				>
					<p style={{ fontWeight: 700, fontSize: 17 }}>Extra Notes</p>
					<Extras medicine={medicine} />
				</Row>
			) : null}
		</Modal>
	);
}

function timingText(medicine) {
	const array = [];
	if (medicine.dosage_time[0]) {
		array.push("before breakfast");
	}
	if (medicine.dosage_time[1]) {
		array.push("after breakfast");
	}
	if (medicine.dosage_time[2]) {
		array.push("before lunch");
	}
	if (medicine.dosage_time[3]) {
		array.push("after lunch");
	}
	if (medicine.dosage_time[4]) {
		array.push("before dinner");
	}
	if (medicine.dosage_time[5]) {
		array.push("after dinner");
	}
	if (medicine.dosage_time[6]) {
		array.push("before sleep");
	}
	if (array.length === 0) {
		return "";
	} else if (array.length === 1) {
		return array[0];
	} else {
		var string = "";
		var index = 0;
		while (index < array.length - 2) {
			string += array[index] + ", ";
			index++;
		}
		string += array[index] + " and " + array[index + 1];
		return string;
	}
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
	} else {
		return <p key={"SideEffect"}>No side effect recorded.</p>;
	}

	return array;
}

function Extras({ medicine }) {
	const array = [];
	medicine.extras.forEach((extra) => {
		array.push(
			<p>
				<i>{extra.header}</i> - {extra.content}
			</p>
		);
	});
	return array;
}
