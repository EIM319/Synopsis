import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import PatientSearchScreen from "./pages/PatientSearchScreen";
import PatientConditionScreen from "./pages/PatientConditionScreen";

function App() {
	return (
		<Container>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PatientSearchScreen />} />
					<Route
						path="/condition"
						element={<PatientConditionScreen />}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</Container>
	);
}

export default App;
