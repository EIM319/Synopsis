import { Navigate } from "react-router-dom";

export default function LoginScreen({ database }) {
	const userName = localStorage.getItem("userName");
	if (userName !== undefined && userName !== null) {
		return <Navigate to="/synopsis" />;
	}

	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<p>User not found</p>
			<p>
				Please rescan the QR code if you received one from the hospital.
			</p>
		</div>
	);
}
