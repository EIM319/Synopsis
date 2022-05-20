import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardScreen from "./pages/DashboardScreen";
import SynopsisScreen from "./pages/SynopsisScreen";
import LabResultScreen from "./pages/LabResultScreen";
import AppointmentScreen from "./pages/AppointmentScreen";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashboardScreen />} />
				<Route path="/synopsis" element={<SynopsisScreen />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
