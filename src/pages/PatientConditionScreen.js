import { Navigate, useLocation } from "react-router-dom";

export default function PatientConditionScreen() {
	const { state } = useLocation();
	if (state == null) {
		return <Navigate to="/" replace />;
	}

	return <>{state.id}</>;
}
