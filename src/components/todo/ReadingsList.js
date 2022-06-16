import ReadingInput from "./ReadingInput";

export default function ReadingsList({ user, database, userName }) {
	const array = [];

	user.monitoring.forEach((item) => {
		array.push(
			<ReadingInput item={item} database={database} userName={userName} />
		);
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
