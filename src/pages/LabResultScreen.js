import React from "react";
import { Container } from "react-bootstrap";
import JsonData from "./data.json";
const url = "https://www.healthhub.sg/HealtheServices";

function LabResultScreen() {
	const DisplayData = JsonData.map((info) => {
		return (
			<tr>
				<td>{info.title}</td>
				<td>{info.content}</td>
			</tr>
		);
	});

	return (
		<Container>
			<p className="sectionHeader">Lab Results</p>

			<center>
				<h3>Access Lab Reports and doctor's suggestions</h3>
			</center>
			<div
				className="card-wrapper"
				onClick={() => window.open(url, "_blank")}
			>
				<span>
					<center>
						<u>Click here for lab reports</u>
					</center>
				</span>
			</div>
			<div>
				<center>
					<h4>Doctor's Analysis</h4>
				</center>
				<table class="table table-striped">
					<tbody>{DisplayData}</tbody>
				</table>
			</div>
		</Container>
	);
}

export default LabResultScreen;
