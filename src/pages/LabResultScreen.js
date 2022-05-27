import React from "react";
import { Container, Image } from "react-bootstrap";
import JsonData from "./data.json";
const url = "https://www.healthhub.sg/HealtheServices";

function LabResultScreen() {
	const DisplayData = JsonData.map((info) => {
		return (
			<tr>
				<td style={{ fontWeight: 500, fontSize: 17 }}>{info.title}</td>
				<td>{info.content}</td>
			</tr>
		);
	});

	return (
		<Container style={{ padding: 20 }}>
			<p className="sectionHeader">Lab Results</p>

			<div style={{ paddingBottom: 60 }}>
				<p className="header">Lab Report</p>
				<p className="paragraph">Get your report from HealthHub.</p>
				<br />
				<Image
					src="https://www.healthhub.sg/_layouts/15/HealthHub_UX2.0/images/homepage/HealthHubLogo.svg"
					className="toggle"
					width={250}
					onClick={() => window.open(url, "_blank")}
				/>
			</div>

			<div>
				<p className="header">Doctor's Analysis</p>
				<br />
				<table class="table table-striped">
					<tbody>{DisplayData}</tbody>
				</table>
			</div>
		</Container>
	);
}

export default LabResultScreen;
