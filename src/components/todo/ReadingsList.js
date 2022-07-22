import ReadingInput from "./ReadingInput";

export default function ReadingsList({ user, database, userName }) {
	const array = [];

	user.monitoring.forEach((item) => {
		if (item.isMonitoring) {
			array.push(
				<>
					<b style={{ fontSize: 17, marginBottom: 10 }}>
						{item.name}
					</b>
					<ReadingInput
						item={item}
						database={database}
						userName={userName}
					/>
					<br />
				</>
			);
		}
	});
	if (user.monitoring.length > 0) {
		return (
			<div className="itemCard" style={{ padding: 20 }}>
				<p className="header">Monitoring</p>
				<div className="line-horizontal" />
				{array}
			</div>
		);
	} else {
		return null;
	}
}
