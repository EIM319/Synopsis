import ReadingInput from "./ReadingInput";

export default function MonitoringItem({
	todo: monitoring,
	index,
	time,
	setSelectedMonitoring,
	setOpenMonitoringModal,
	database,
	userName,
}) {
	return (
		<div className="itemRow " key={"monitoringitem" + index}>
			<p style={{ fontSize: 15, width: 130, color: "gray" }}>{time}</p>
			<div className="itemColumn">
				<div
					className="toggle"
					style={{ display: "flex", flexDirection: "column" }}
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
				<br />
				<ReadingInput
					item={monitoring}
					database={database}
					userName={userName}
				/>
			</div>
		</div>
	);
}
