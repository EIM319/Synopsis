import React from "react";
import { Container, Image } from "react-bootstrap";
import ImageToggle from "../assets/HealthHubToggle.png";
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
					<p className="paragraph">
						A summary of your lab results by the doctor. For full
						report, please obtain from HealthHub.
					</p>
				</Container>
			</div>
			<Container style={{ maxWidth: 1000, padding: 30 }}>
				<div style={{ paddingBottom: 50 }}>
					<div style={{ paddingBottom: 60 }}>
						<p className="header">Lab Report</p>
						<p className="paragraph">
							Click the button below to get your report from
							HealthHub.
						</p>
						<br />
						<Image
							src={ImageToggle}
							className="toggle"
							width={250}
							onClick={() => window.open(url, "_blank")}
						/>
					</div>
					<div>
						<p className="header">Doctor's Analysis</p>
						<br />
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
					</div>
				</div>
			</Container>
		</div>
	);
}

export default LabResultScreen;
