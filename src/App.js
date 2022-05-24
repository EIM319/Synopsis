import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SynopsisScreen from "./pages/SynopsisScreen";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SynopsisScreen />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
