import { useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PatientSearchScreen() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const navigation = useNavigate();

	function getHeight() {
		if (searchTerm.length > 0) {
			return 200;
		} else {
			return "100vh";
		}
	}

	function search(term) {
		const filtered = patients.filter(
			(patient) =>
				patient.name.toLowerCase().includes(term) ||
				patient.id.toLowerCase().includes(term)
		);
		setSearchResult(filtered);
	}

	function Patients({ results }) {
		const array = [];
		if (searchTerm.length === 0) return <></>;
		results.forEach((patient) => {
			array.push(
				<Col sm={6} md={4} lg={3} key={patient.id}>
					<div
						className="Card"
						onClick={() => {
							console.log(patient.id);
							navigation("/condition", {
								state: { id: patient.id },
							});
						}}
					>
						<p style={{ fontSize: 20, fontWeight: 500 }}>
							{patient.name}
						</p>
						<p>#{patient.id}</p>
					</div>
				</Col>
			);
		});
		return <Row>{array}</Row>;
	}

	return (
		<>
			<div
				style={{
					width: "100%",
					height: getHeight(),
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					transition: "height 0.5s",
				}}
			>
				<div style={{ width: "90%", maxWidth: 600 }}>
					<FormControl
						placeholder="Search Patient Name / ID"
						onChange={(event) => {
							setSearchTerm(event.target.value);
							search(event.target.value.toLowerCase());
						}}
					/>
				</div>
			</div>
			<Patients results={searchResult} />
		</>
	);
}

const patients = [
	{
		name: "David",
		id: "01134557",
	},
	{
		name: "James",
		id: "01254660",
	},
	{
		name: "May",
		id: "00454821",
	},
	{
		name: "Cheryl",
		id: "02239001",
	},
	{
		name: "Joel",
		id: "01720011",
	},
	{
		name: "Jack",
		id: "00847645",
	},
];
