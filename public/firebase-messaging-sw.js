importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("../firebase-messaging-sw.js")
		.then(function (registration) {
			console.log(
				"Registration successful, scope is:",
				registration.scope
			);
		})
		.catch(function (err) {
			console.log("Service worker registration failed, error:", err);
		});
}

const firebaseConfig = {
	apiKey: "AIzaSyDl4oBi9R0lWDIj8Uk2GrjzK3D-XB36xOM",
	authDomain: "eim319.firebaseapp.com",
	projectId: "eim319",
	storageBucket: "eim319.appspot.com",
	messagingSenderId: "1073648820814",
	appId: "1:1073648820814:web:77bf3fdae494e78da0191f",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {});
