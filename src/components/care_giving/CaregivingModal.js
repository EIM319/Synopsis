import { Image, Row, Modal } from "react-bootstrap";

export function CaregivingModal({ openModal, setOpenModal, caregiving }) {
	if (caregiving === null) return null;
	const components = [];
	caregiving.content.forEach((item) => {
		switch (item.type) {
			case "purpose":
				components.push(
					<p
						style={{
							fontSize: 23,
							fontWeight: 500,
							paddingBottom: 10,
							paddingTop: 10,
						}}
					>
						{item.purpose}
					</p>
				);
				break;
			case "header":
				components.push(<p style={{ fontSize: 17 }}>{item.content1}</p>);
				break;
			case "image":
				components.push(
					<Image
						src={item.content2}
						style={{
							width: "75%",
							aspectRatio: 1,
							objectFit: "contain",
						}}
					/>
				);
				break;
			case "section":
				components.push(
					<p style={{ fontWeight: 700, fontSize: 17 }}>
						{item.content3}
					</p>
				);
				break;
		}
	});
	return (
		<Modal show={openModal} onHide={() => setOpenModal(false)} centered>
			<Row style={{ padding: 20 }}>{components}</Row>
		</Modal>
	);
}
