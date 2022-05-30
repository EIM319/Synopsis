self.addEventListener("push", (event) => {
	self.registration.showNotification(event.data.text());
});
