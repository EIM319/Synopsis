import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { MedicationModal } from "../components/medication/MedicationModal";
import medication from "../mockdata/medication.json";

export default function MedicationScreen() {
	const [openModal, setOpenModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);

	const array = [];
	medication.medication.forEach((medicine) => {
		array.push(
			<Medication
				medicine={medicine}
				setOpenModal={setOpenModal}
				setSelectedMedicine={setSelectedMedicine}
				key={"Medicine " + medication.medication.indexOf(medicine)}
			/>
		);
	});
	return (
		<Container>
			<Row className="bootstrapRow" style={{ padding: 20 }}>
				{array}
			</Row>
			<MedicationModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				medicine={selectedMedicine}
			/>
		</Container>
	);
}

function Medication({ medicine, setOpenModal, setSelectedMedicine }) {
	return (
		<Col sm={6} lg={4} className="bootstrapColumn">
			<div style={{ padding: 10 }}>
				<div
					className="card toggle"
					onClick={() => {
						setSelectedMedicine(medicine);
						setOpenModal(true);
					}}
				>
					<Image
						src={medicine.image}
						style={{ aspectRatio: 1.25, objectFit: "contain" }}
					/>
					<div style={{ padding: 10 }}>
						<p style={{ fontSize: 17, fontWeight: 500 }}>
							{medicine.name}
						</p>
						<p style={{ fontSize: 13 }}>{medicine.purpose}</p>
					</div>
				</div>
			</div>
		</Col>
	);
}
