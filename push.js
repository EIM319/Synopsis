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
		"https://fcm.googleapis.com/fcm/send/drlXREUjSvY:APA91bGZV4ISgvj6CbIzbtLTngO7LpdvMioTsENh_Uvpd04A_jBAoFySx0KQSlIQ0zhtciQH19bxazaLKVbB3TahN6zvNjbSU4UFvy7oFgSQ2q8pjXGy8FoMOL1FXzp0tGut_-dkHmwt",
	expirationTime: null,
	keys: {
		p256dh: "BCQHDTv9HaNo1sqDrSkPxSdBUe8kgr5KKWzwN6bRKoMPkaI3DPpmDnjndvlrbxSn4whOfliCKMU9FGC0ri0pGiU",
		auth: "vJAFESSULaE2-lFK0m2E1Q",
	},
};

push.sendNotification(sub, "Message goes here");
