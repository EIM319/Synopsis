import { Container } from "react-bootstrap";

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
					{status.dischargeDate} from
				</p>
				<p style={{ fontSize: 30, fontWeight: 700 }}>Ward</p>
				<p
					style={{
						fontSize: 70,
						margin: 0,
						fontWeight: 500,
					}}
				>
					{status.ward}
				</p>
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
			<p style={{ fontSize: 30, fontWeight: 700 }}>Ward</p>
			<p
				style={{
					fontSize: 70,
					margin: 0,
					fontWeight: 500,
				}}
			>
				{status.ward}
			</p>
		</Container>
	);
}
