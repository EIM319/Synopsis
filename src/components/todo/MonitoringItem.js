import ReadingInput from "./ReadingInput";

export default function MonitoringItem({
	todo: monitoring,
	index,
	setSelectedMonitoring,
	setOpenMonitoringModal,
	database,
	userName,
	isToday,
}) {
	console.log(isToday);

	return (
		<div className="itemRow " key={"monitoringitem" + index}>
			<div className="itemColumn">
				<div
					className="toggle"
					style={{
						display: "flex",
						flexDirection: "column",
						padding: 10,
					}}
					onClick={() => {
						setSelectedMonitoring(monitoring);
						setOpenMonitoringModal(true);
					}}
				>
					<p style={{ fontSize: 17, fontWeight: 500 }}>
						{monitoring.name}
					</p>
					<p style={{ fontSize: 15 }}>{monitoring.purpose}</p>
				</div>
				{!isToday ||
				monitoring.recordingType === null ||
				monitoring.recordingType === undefined ? null : (
					<ReadingInput
						item={monitoring}
						database={database}
						userName={userName}
						type={monitoring.recordingType}
					/>
				)}
			</div>
		</div>
	);
}
