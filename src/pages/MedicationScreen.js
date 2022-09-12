import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MedicationModal } from "../components/medication/MedicationModal";
import { CgPill } from "react-icons/cg";

export default function MedicationScreen({ user }) {
	const [openModal, setOpenModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);

	const array = [];
	user.medication.forEach((medicine) => {
		array.push(
			<Medication
				medicine={medicine}
				setOpenModal={setOpenModal}
				setSelectedMedicine={setSelectedMedicine}
				key={"Medicine " + user.medication.indexOf(medicine)}
			/>
		);
	});
	return (
		<div style={{ width: "100%" }}>
			<div
				style={{
					background: "var(--accent)",
					color: "white",
					width: "100%",
					padding: 30,
				}}
			>
				<Container style={{ maxWidth: 1000 }}>
					<p className="sectionHeader">
						Medication <CgPill size={30} />
					</p>
					<p className="paragraph">
						The list below shows all the medication you currently
						need to take. If you do not see a medication here, it
						means that you are no longer required to take it. You
						may discard it, or lock it up in somewhere not
						accessible. If you decide to throw it away, note that
						you may be required to purchase it again in the future.
					</p>
				</Container>
			</div>
			<Container style={{ maxWidth: 1000, padding: "30px 10px" }}>
				<div style={{ paddingBottom: 50 }}>
					{user.medication.length === 0 ? (
						<p style={{ fontSize: 19 }}>You have no medication.</p>
					) : (
						<>
							<Row className="bootstrapRow">{array}</Row>
							<MedicationModal
								openModal={openModal}
								setOpenModal={setOpenModal}
								medicine={selectedMedicine}
							/>
						</>
					)}
				</div>
			</Container>
		</div>
	);
}

function Medication({ medicine, setOpenModal, setSelectedMedicine }) {
	return (
		<Col sm={6} lg={4} className="bootstrapColumn" style={{ padding: 5 }}>
			<div
				className="itemCard toggle"
				style={{ height: "100%" }}
				onClick={() => {
					setSelectedMedicine(medicine);
					setOpenModal(true);
				}}
			>
				{/* <Image
						src={medicine.image}
						style={{
							aspectRatio: 1.25,
							objectFit: "contain",
							width: "100%",
						}}
					/> */}
				<div style={{ padding: 10 }}>
					<p
						style={{
							fontSize: 19,
							fontWeight: 500,
						}}
					>
						{medicine.name}
					</p>
					<p style={{ fontSize: 15 }}>{medicine.purpose}</p>
				</div>
			</div>
		</Col>
	);
}
