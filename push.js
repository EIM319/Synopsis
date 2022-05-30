var push = require("web-push");

const id = {
	publicKey:
		"BIH3Nifzw8KH2lSGTK-aAZ0HNnop-kUuWSRttfVVRGm1Cr5yU61XwW9bZ67Asantr8zJ-0h_klYFxKQwW7VAvVM",
	privateKey: "lu6MtsdYNfOaTVUEQWKVw6rt6CEGdEefvgQje-2991k",
};

const sub = {
	endpoint:
		"https://fcm.googleapis.com/fcm/send/e_vb8c7LSX0:AP…uwsIkoZ1QZMqFURMwmeDD_gpO1pZ5n_H81o8hTlXae8M4WTZ1",
	expirationTime: null,
	keys: {
		p256dh: "BIH3Nifzw8KH2lSGTK-aAZ0HNnop-kUuWSRttfVVRGm1Cr5yU61XwW9bZ67Asantr8zJ-0h_klYFxKQwW7VAvVM",
		auth: "",
	},
};

push.sendNotification(sub, "Message");
