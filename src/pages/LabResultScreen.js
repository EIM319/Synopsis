import React from "react";
import { Button, Container } from "react-bootstrap";
import { CgTranscript } from "react-icons/cg";

const url = "https://www.healthhub.sg/HealtheServices";

function LabResultScreen({ labResult }) {
	const DisplayData = labResult.map((info) => {
		return (
			<tr>
				<td style={{ fontWeight: 500, fontSize: 17 }}>{info.title}</td>
				<td>{info.content}</td>
				<td>{info.solution}</td>
			</tr>
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
						Lab Results <CgTranscript size={30} />
					</p>
					<p className="paragraph" style={{ paddingBottom: 10 }}>
						A summary of your lab results by the doctor. For full
						report, please obtain from HealthHub.
					</p>
					<Button
						variant="outline-light"
						onClick={() => window.open(url, "_blank")}
					>
						Get full report from HealthHub
					</Button>
				</Container>
			</div>
			<Container style={{ maxWidth: 1000, padding: "30px 10px" }}>
				<div style={{ paddingBottom: 50 }}>
					{labResult.length === 0 ? (
						<p style={{ fontSize: 19 }}>You have no lab results.</p>
					) : (
						<table className="table table-striped">
							<thead>
								<tr>
									<th>Result Profile</th>
									<th>Result Explanation</th>
									<th>Changes based on Result</th>
								</tr>
							</thead>
							<tbody>{DisplayData}</tbody>
						</table>
					)}
				</div>
			</Container>
		</div>
	);
}

export default LabResultScreen;
