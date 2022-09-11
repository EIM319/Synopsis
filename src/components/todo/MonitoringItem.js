import ReadingInput from "./ReadingInput";
import { CgBandAid } from "react-icons/cg";

export default function MonitoringItem({
	todo: monitoring,
	index,
	setSelectedMonitoring,
	setOpenMonitoringModal,
	database,
	userName,
	isToday,
}) {
	return (
		<div
			className="itemRow "
			key={"monitoringitem" + index}
			style={{ padding: 10 }}
		>
			<div style={{ width: 30, margin: "10px 10px 0px 0px" }}>
				<CgBandAid size={30} />
			</div>

			<div className="itemColumn">
				<div
					className="toggle"
					style={{
						display: "flex",
						flexDirection: "column",
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
