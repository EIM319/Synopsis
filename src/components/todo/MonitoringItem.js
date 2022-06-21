export default function MonitoringItem({
	todo: monitoring,
	index,
	time,
	setSelectedMonitoring,
	setOpenMonitoringModal,
}) {
	return (
		<div
			className="itemRow toggle"
			key={"monitoringitem" + index}
			onClick={() => {
				setSelectedMonitoring(monitoring);
				setOpenMonitoringModal(true);
			}}
		>
			<p style={{ fontSize: 15, width: 130, color: "gray" }}>{time}</p>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<p style={{ fontSize: 17, fontWeight: 500 }}>
					{monitoring.name}
				</p>
				<p style={{ fontSize: 15 }}>{monitoring.purpose}</p>
			</div>
		</div>
	);
}
