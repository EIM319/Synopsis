import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SynopsisScreen from "./pages/SynopsisScreen";

function App() {
	Notification.requestPermission().then((value) => {
		if (value === "granted") {
			prepareNotification();
		}
	});

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

async function prepareNotification() {
	console.log("Registering Service Worker");
	navigator.serviceWorker.register("service-worker.js");
	navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
		var options = {
			userVisibleOnly: true,
			applicationServerKey:
				"BIH3Nifzw8KH2lSGTK-aAZ0HNnop-kUuWSRttfVVRGm1Cr5yU61XwW9bZ67Asantr8zJ-0h_klYFxKQwW7VAvVM",
		};
		serviceWorkerRegistration.pushManager.subscribe(options).then(
			function (pushSubscription) {
				console.log(JSON.stringify(pushSubscription.endpoint));
				// The push subscription details needed by the application
				// server are now available, and can be sent to it using,
				// for example, an XMLHttpRequest.
			},
			function (error) {
				console.log(error);
			}
		);
	});
}
