import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CgComment } from "react-icons/cg";
import { HomeMonitoringModal } from "../components/home_monitoring/HomeMonitoringModal";
import { MedicationModal } from "../components/medication/MedicationModal";

export default function AdditionalNoteScreen({ user }) {
	const DisplayData = user.additional_notes.map((notes) => {
		return (
			<Col xs={12} xm={6} lg={4}>
				<div
					style={{
						background: "#fff5c4",
						padding: 20,
						marginBottom: 10,
					}}
				>
					<p style={{ fontWeight: 500, fontSize: 17 }}>
						{notes.title}
					</p>
					<p>{notes.value}</p>
					<Attachment
						type={notes.attachedType}
						content={notes.attachedItem}
						user={user}
					/>
				</div>
			</Col>
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
						Care Staff's Comments <CgComment size={30} />
					</p>
					<p className="paragraph">
						Additional notes from the doctor, including diet and
						activity restrictions, are stated below.
					</p>
				</Container>
			</div>
			<Container style={{ maxWidth: 1000, padding: "30px 10px" }}>
				<div style={{ paddingBottom: 50 }}>
					{user.additional_notes.length === 0 ? (
						<p style={{ fontSize: 19 }}>
							You have no care staff's comments.
						</p>
					) : (
						<Row>{DisplayData}</Row>
					)}
				</div>
			</Container>
		</div>
	);
}

export function Attachment({ type, content, user }) {
	const [show, setShow] = useState(false);
	if (type === "monitoring") {
		const article = user.monitoring.find(
			(article) => article.name === content
		);
		if (article === undefined) return null;
		return (
			<>
				<div
					className="toggle"
					style={{
						background: "#f2e7b1",
						padding: 10,
						marginTop: 10,
						borderRadius: 5,
						color: "#212121",
					}}
					onClick={() => {
						setShow(true);
					}}
				>
					<b>{article.name}</b>
					<p>Click to view</p>
				</div>
				<HomeMonitoringModal
					openModal={show}
					setOpenModal={setShow}
					monitor={article}
				/>
			</>
		);
	} else if (type === "medication") {
		const article = user.medication.find(
			(article) => article.name === content
		);
		return (
			<>
				<div
					className="toggle"
					style={{
						background: "#f2e7b1",
						padding: 10,
						marginTop: 10,
						borderRadius: 5,
						color: "#212121",
					}}
					onClick={() => {
						setShow(true);
					}}
				>
					<b>{article.name}</b>
					<p>Click to view</p>
				</div>
				<MedicationModal
					openModal={show}
					setOpenModal={setShow}
					medicine={article}
				/>
			</>
		);
	}
	return null;
}
