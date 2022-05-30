// // This allows the web app to trigger skipWaiting via
// // registration.waiting.postMessage({type: 'SKIP_WAITING'})
// self.addEventListener("message", (event) => {
// 	if (event.data && event.data.type === "SKIP_WAITING") {
// 		self.skipWaiting();
// 	}
// });

self.addEventListener("push", (event) => {
	new Notification("Working", { body: "Text Body" });
});
