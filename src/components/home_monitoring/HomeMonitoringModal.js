import { Image, Row, Modal } from "react-bootstrap";
import YouTube from "../Youtube";

export function HomeMonitoringModal({ openModal, setOpenModal, monitor }) {
	if (monitor === null) return null;
	const components = [];
	monitor.content.forEach((item) => {
		switch (item.type) {
			case "image":
				components.push(
					<Image
						src={item.content}
						style={{
							width: "75%",
							aspectRatio: 1,
							objectFit: "contain",
						}}
					/>
				);
				break;
			case "video":
				components.push(<YouTube id={item.content} />);
				break;
			case "section":
				components.push(
					<p
						style={{
							fontWeight: 700,
							fontSize: 17,
							paddingTop: 20,
							paddingBottom: 10,
						}}
					>
						{item.content}
					</p>
				);
				break;
			case "instruction":
				components.push(
					<p style={{ paddingBottom: 10 }}> {item.content} </p>
				);
				break;
			default: {
				components.push(
					<p style={{ fontStyle: "italic", paddingBottom: 10 }}>
						{item.content}
					</p>
				);
			}
		}
	});
	return (
		<div>
			<Modal show={openModal} onHide={() => setOpenModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>{monitor.name}</Modal.Title>
				</Modal.Header>
				<Row style={{ padding: 20 }}>{components}</Row>
			</Modal>
		</div>
	);
}
