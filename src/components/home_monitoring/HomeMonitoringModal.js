import { useState, useEffect } from "react";
import { Image, Row, Modal, Table, Spinner } from "react-bootstrap";
import YouTube from "../Youtube";

export function HomeMonitoringModal({ openModal, setOpenModal, monitor }) {
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		setShowLoading(true);
	}, [openModal]);

	if (monitor === null) return null;

	if (monitor.pdf !== undefined && monitor.pdf !== null) {
		return (
			<Modal
				show={openModal}
				onHide={() => setOpenModal(false)}
				centered
				size="xl"
			>
				<Modal.Header closeButton>
					<Modal.Title>{monitor.name}</Modal.Title>
				</Modal.Header>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "70vh",
					}}
				>
					{showLoading ? (
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					) : null}

					<iframe
						src={monitor.pdf}
						style={{
							width: "100%",
							height: "70vh",
							display: getDisplay(),
						}}
						onLoad={() => {
							setShowLoading(false);
						}}
					/>
				</div>
			</Modal>
		);
	}

	function getDisplay() {
		if (showLoading) return "none";
		else return "flex";
	}

	const components = [];
	monitor.content.forEach((item) => {
		switch (item.type) {
			case "image":
				components.push(
					<Image
						src={item.content}
						style={{
							width: "75%",
							aspectRatio: 1,
							objectFit: "contain",
							maxWidth: 500,
						}}
					/>
				);
				break;
			case "video":
				components.push(<YouTube id={item.content} />);
				break;
			case "section":
				components.push(
					<p
						style={{
							fontWeight: 700,
							fontSize: 17,
							paddingTop: 20,
							paddingBottom: 10,
						}}
					>
						{item.content}
					</p>
				);
				break;
			case "instruction":
				components.push(
					<p style={{ paddingBottom: 10 }}> {item.content} </p>
				);
				break;
			default: {
				components.push(
					<p style={{ fontStyle: "italic", paddingBottom: 10 }}>
						{item.content}
					</p>
				);
			}
		}
	});
	return (
		<div>
			<Modal show={openModal} onHide={() => setOpenModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>{monitor.name}</Modal.Title>
				</Modal.Header>
				<br />
				{monitor.isMonitoring ? (
					<Row style={{ paddingLeft: 20, paddingRight: 20 }}>
						<p style={{ fontWeight: 700, fontSize: 17 }}>
							Schedule
						</p>
						<p style={{ fontWeight: 500, fontSize: 13 }}>
							{timingText(monitor)}
						</p>
						<DayText article={monitor} />
						<div className="line-horizontal" />
					</Row>
				) : null}
				<Row style={{ paddingLeft: 20, paddingRight: 20 }}>
					{components}
				</Row>
			</Modal>
		</div>
	);
}

function DayText({ article }) {
	return (
		<div style={{ padding: 10 }}>
			<Table bordered>
				<thead>
					<tr style={{ textAlign: "center" }}>
						<th style={{ fontSize: 13 }}>SUN</th>
						<th style={{ fontSize: 13 }}>MON</th>
						<th style={{ fontSize: 13 }}>TUE</th>
						<th style={{ fontSize: 13 }}>WED</th>
						<th style={{ fontSize: 13 }}>THU</th>
						<th style={{ fontSize: 13 }}>FRI</th>
						<th style={{ fontSize: 13 }}>SAT</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ textAlign: "center" }}>
						<th>{article.days[0] ? "✓" : ""}</th>
						<th>{article.days[1] ? "✓" : ""}</th>
						<th>{article.days[2] ? "✓" : ""}</th>
						<th>{article.days[3] ? "✓" : ""}</th>
						<th>{article.days[4] ? "✓" : ""}</th>
						<th>{article.days[5] ? "✓" : ""}</th>
						<th>{article.days[6] ? "✓" : ""}</th>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

function timingText(article) {
	const array = [];
	if (article.time[0]) {
		array.push("before breakfast");
	}
	if (article.time[1]) {
		array.push("after breakfast");
	}
	if (article.time[2]) {
		array.push("before lunch");
	}
	if (article.time[3]) {
		array.push("after lunch");
	}
	if (article.time[4]) {
		array.push("before dinner");
	}
	if (article.time[5]) {
		array.push("after dinner");
	}
	if (article.time[6]) {
		array.push("before sleep");
	}
	if (array.length === 0) {
		return "";
	} else if (array.length === 1) {
		return array[0];
	} else {
		var string = "";
		var index = 0;
		while (index < array.length - 2) {
			string += array[index] + ", ";
			index++;
		}
		string += array[index] + " and " + array[index + 1];
		return string;
	}
}
