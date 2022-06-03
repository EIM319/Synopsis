import React from "react";
import { Container, Image } from "react-bootstrap";
import JsonData from "../mockdata/lab_result.json";
import ImageToggle from "../assets/HealthHubToggle.png";
const url = "https://www.healthhub.sg/HealtheServices";

function LabResultScreen() {
	const DisplayData = JsonData.map((info) => {
		return (
			<tr>
				<td style={{ fontWeight: 500, fontSize: 17 }}>{info.title}</td>
				<td>{info.content}</td>
				<td>{info.solution}</td>
			</tr>
		);
	});

	return (
		<Container style={{ padding: "20, 10, 20, 10" }}>
			<div style={{ maxWidth: 1000, paddingBottom: 50 }}>
				<p className="sectionHeader">Lab Results</p>
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
	);
}

export default LabResultScreen;
