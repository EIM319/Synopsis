import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { CaregivingModal } from "../components/care_giving/CaregivingModal";
import caregiving from "../mockdata/caregiving.json";

export default function CaregivingScreen() {
	const [openModal, setOpenModal] = useState(false);
	const [selectedCaregiving, setSelectedCaregiving] = useState(null);

	const array = [];
	caregiving.caregiving.forEach((item) => {
		array.push(
			<Caregiving
				caregiving={item}
				setOpenModal={setOpenModal}
				setSelectedCaregiving={setSelectedCaregiving}
			/>
		);
	});
	return (
		<Container style={{ padding: "20, 10, 20, 10" }}>
			<p className="sectionHeader">Caregiving</p>
			<Row className="bootstrapRow">{array}</Row>
			<CaregivingModal
				openModal={openModal}
				setOpenModal={setOpenModal}
				caregiving={selectedCaregiving}
			/>
		</Container>
	);
}

function Caregiving({ caregiving, setOpenModal, setSelectedCaregiving }) {
	return (
		<Col sm={6} lg={4} className="bootstrapColumn">
			<div style={{ padding: 10 }}>
				<div
					className="itemCard toggle"
					onClick={() => {
						setSelectedCaregiving(caregiving);
						setOpenModal(true);
					}}
				>
					<Image
						src={caregiving.image}
						style={{ aspectRatio: 1.25, objectFit: "contain" }}
					/>
					<div style={{ padding: 10 }}>
						<p style={{ fontSize: 17, fontWeight: 500 }}>
							{caregiving.name}
						</p>
						<p style={{ fontSize: 13 }}>{caregiving.purpose}</p>
					</div>
				</div>
			</div>
		</Col>
	);
}
