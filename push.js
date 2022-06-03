var push = require("web-push");

const id = {
	publicKey:
		"BIH3Nifzw8KH2lSGTK-aAZ0HNnop-kUuWSRttfVVRGm1Cr5yU61XwW9bZ67Asantr8zJ-0h_klYFxKQwW7VAvVM",
	privateKey: "lu6MtsdYNfOaTVUEQWKVw6rt6CEGdEefvgQje-2991k",
};

push.setVapidDetails(
	"https://eim319synopsis.herokuapp.com/",
	id.publicKey,
	id.privateKey
);

// Change when data is cleared in browser
const sub = {
	endpoint:
		"https://fcm.googleapis.com/fcm/send/dQRXbqj9dnM:APA91bHKUTmx3ofxaQHHcz5oeIMiL8ToTSp4oGsloESxVBxUNABHR6QxTTZYB0IRy6JXtZ1dMqj1xMT7cf8BXAOHgcox8VSnudWoW9gnMrnlhLHGzKjQAx69XkE5tp4DwUbw-xU_6zOn",
	expirationTime: null,
	keys: {
		p256dh: "BEt1TkkNeE_-ep4A7ouABEg4dMdhXOv9Y0sCItO472aRnaTG0IFI8pqiHiyuoCsIcfCcwofh6GaiK8IfDHKHsV4",
		auth: "cUfWviEqbPbcpVDo44ih9A",
	},
};

push.sendNotification(sub, "Message goes here");
