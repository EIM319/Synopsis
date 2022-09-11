import { Container, Row, Col } from "react-bootstrap";

export default function InPatientScreen({ status }) {
	if (status.isDischarging) {
		return (
			<Container
				style={{
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<p
					style={{
						fontSize: 20,
						paddingBottom: 20,
						textAlign: "center",
					}}
				>
					Patient is scheduled to be discharge on{" "}
					{status.dischargeDate} at {status.dischargeTime}.
				</p>
				<Row style={{ width: "100%", maxWidth: 300 }}>
					<Col xs={6}>
						<p
							style={{
								fontSize: 30,
								fontWeight: 700,
								textAlign: "center",
							}}
						>
							Ward
						</p>
						<p
							style={{
								fontSize: 70,
								margin: 0,
								fontWeight: 500,
								textAlign: "center",
							}}
						>
							{status.ward}
						</p>
					</Col>
					<Col xs={6}>
						<p
							style={{
								fontSize: 30,
								fontWeight: 700,
								textAlign: "center",
							}}
						>
							Bed
						</p>
						<p
							style={{
								fontSize: 70,
								margin: 0,
								fontWeight: 500,
								textAlign: "center",
							}}
						>
							{status.bed}
						</p>
					</Col>
				</Row>
			</Container>
		);
	}

	return (
		<Container
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<p style={{ fontSize: 20, paddingBottom: 20, textAlign: "center" }}>
				Patient is currently admitted to Alexandra Hospital
			</p>
			<Row style={{ width: "100%", maxWidth: 300 }}>
				<Col xs={6}>
					<p
						style={{
							fontSize: 30,
							fontWeight: 700,
							textAlign: "center",
						}}
					>
						Ward
					</p>
					<p
						style={{
							fontSize: 70,
							margin: 0,
							fontWeight: 500,
							textAlign: "center",
						}}
					>
						{status.ward}
					</p>
				</Col>
				<Col xs={6}>
					<p
						style={{
							fontSize: 30,
							fontWeight: 700,
							textAlign: "center",
						}}
					>
						Bed
					</p>
					<p
						style={{
							fontSize: 70,
							margin: 0,
							fontWeight: 500,
							textAlign: "center",
						}}
					>
						{status.bed}
					</p>
				</Col>
			</Row>
		</Container>
	);
}
