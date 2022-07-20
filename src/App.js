import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { doc, getFirestore, updateDoc } from "firebase/firestore/lite";
import { getMessaging, getToken } from "firebase/messaging";
import SynopsisScreen from "./pages/SynopsisScreen";
import { initializeApp } from "firebase/app";
import DashboardScreen from "./pages/DashboardScreen";
import ArchiveScreen from "./pages/ArchiveScreen";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useRef } from "react";
import PreviewScreen from "./pages/PreviewScreen";
import LoginScreen from "./pages/LoginScreen";

const firebaseConfig = {
	apiKey: "AIzaSyDl4oBi9R0lWDIj8Uk2GrjzK3D-XB36xOM",
	authDomain: "eim319.firebaseapp.com",
	projectId: "eim319",
	storageBucket: "eim319.appspot.com",
	messagingSenderId: "1073648820814",
	appId: "1:1073648820814:web:77bf3fdae494e78da0191f",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getFirestore(app);

function App() {
	Notification.requestPermission().then((value) => {
		if (value === "granted") {
			prepareNotification();
		}
	});
	const tawkMessengerRef = useRef();

	const handleMinimize = () => {
		tawkMessengerRef.current.minimize();
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginScreen database={db} />} />
				<Route
					path="/home/:userName"
					element={<DashboardScreen database={db} />}
				/>
				<Route
					path="synopsis"
					element={<SynopsisScreen database={db} />}
				/>
				<Route
					path="archive/:userName"
					element={<ArchiveScreen database={db} />}
				/>
				<Route
					path="preview/:userName"
					element={<PreviewScreen database={db} />}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			<div className="App">
				{/* <button onClick={handleMinimize}> Minimize the Chat </button> */}

				<TawkMessengerReact
					propertyId="62c6f24ab0d10b6f3e7b49fe"
					widgetId="1g7ci4tc6"
					ref={tawkMessengerRef}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;

async function prepareNotification() {
	getToken(messaging, {
		vapidKey:
			"BL7qdJGKiBfjTLyKh-VeWai2Xjrpk_tr5H49O2CeMrQgmx4TQDZpMYlaOFhpwGOsu195uVFnpRxxYWXlQOTE2vk",
	}).then(async (token) => {
		if (token) {
			const userName = localStorage.getItem("userName");
			if (userName === null || userName === undefined) return;
			const ref = doc(db, "users", userName);
			await updateDoc(ref, {
				notificationKey: token,
			});
			console.log(token);
		} else {
			console.log("Failed to create token");
		}
	});

	// navigator.serviceWorker.register(
	// 	`${process.env.PUBLIC_URL}/service-worker.js`
	// );
	// navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
	// 	var options = {
	// 		userVisibleOnly: true,
	// 		applicationServerKey:
	// 			"BIH3Nifzw8KH2lSGTK-aAZ0HNnop-kUuWSRttfVVRGm1Cr5yU61XwW9bZ67Asantr8zJ-0h_klYFxKQwW7VAvVM",
	// 	};
	// 	serviceWorkerRegistration.pushManager.subscribe(options).then(
	// 		async function (pushSubscription) {
	// 			const userName = localStorage.getItem("userName");
	// 			if (userName === null || userName === undefined) return;
	// 			const ref = doc(db, "users", userName);
	// 			await updateDoc(ref, {
	// 				notificationKey: JSON.stringify(pushSubscription),
	// 			});
	// 			console.log(JSON.stringify(pushSubscription));
	// 		},
	// 		function (error) {
	// 			console.log(error);
	// 		}
	// 	);
	// });
}
