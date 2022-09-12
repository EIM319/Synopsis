import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { HomeMonitoringModal } from "../components/home_monitoring/HomeMonitoringModal";
import ImagePlaceholder from "../assets/placeholder.jpg";
import { CgBandAid } from "react-icons/cg";

export default function HomeMonitoringScreen({ user, database, userName }) {
	const [openModal, setOpenModal] = useState(false);
	const [selectedMonitoring, setSelectedMonitoring] = useState(null);

	const array = [];
	user.monitoring.forEach((item) => {
		array.push(
			<Monitoring
				item={item}
				setOpenModal={setOpenModal}
				setSelectedMonitoring={setSelectedMonitoring}
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
						Articles <CgBandAid size={30} />
					</p>
					<p className="paragraph">
						This list contains measurements you need to do at home,
						as well as guides to carry out caregiving for the
						patient. Simply click/tap any of them to view the
						instructions.
					</p>
				</Container>
			</div>
			<Container style={{ maxWidth: 1000, padding: 30 }}>
				<div style={{ paddingBottom: 50 }}>
					<Row className="bootstrapRow">{array}</Row>
					<HomeMonitoringModal
						openModal={openModal}
						setOpenModal={setOpenModal}
						monitor={selectedMonitoring}
					/>
				</div>
			</Container>
		</div>
	);
}

function Monitoring({ item, setOpenModal, setSelectedMonitoring }) {
	return (
		<Col sm={6} lg={4} className="bootstrapColumn">
			<div style={{ padding: 10 }}>
				<div
					className="itemCard toggle"
					onClick={() => {
						setSelectedMonitoring(item);
						setOpenModal(true);
					}}
				>
					<Image
						src={
							item.image.length > 0
								? item.image
								: ImagePlaceholder
						}
						style={{
							aspectRatio: 1.25,
							objectFit: "contain",
							width: "100%",
						}}
					/>
					<div style={{ padding: 10 }}>
						<p style={{ fontSize: 17, fontWeight: 500 }}>
							{item.name}
						</p>
						<p style={{ fontSize: 15 }}>{item.purpose}</p>
					</div>
				</div>
			</div>
		</Col>
	);
}
