import { useEffect, useState } from "react";
import SynopsisScreen from "./SynopsisScreen";
import { doc, getDoc } from "firebase/firestore/lite";
import InPatientScreen from "./InPatientScreen";

export default function RedirectScreen({ analytics, database }) {
	const [status, setStatus] = useState();

	useEffect(() => {
		getStatus(database, setStatus);
	}, []);
	if (status === undefined) return null;

	if (status === null)
		return <SynopsisScreen database={database} analytics={analytics} />;

	return (
		<InPatientScreen
			status={status}
			setStatus={setStatus}
			database={database}
		/>
	);
}

async function getStatus(database, setStatus) {
	const userName = localStorage.getItem("userName");
	if (userName === undefined || userName === null) {
		setStatus(null);
		return;
	}
	const ref = doc(database, "hospitalization", userName);
	const status = await getDoc(ref);
	if (!status.exists()) {
		setStatus(null);
	} else {
		var data = status.data();
		setStatus(data);
	}
}
