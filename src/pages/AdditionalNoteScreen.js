import { Col, Container, Row } from "react-bootstrap";
import { CgComment } from "react-icons/cg";

export default function AdditionalNoteScreen({ additionalNotes }) {
	const DisplayData = additionalNotes.map((notes) => {
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
					{additionalNotes.length === 0 ? (
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
