import {Image, Row, Modal} from "react-bootstrap";
import monitoring from "../../mockdata/monitoring.json"


export function HomeMonitoringModal({openModal, setOpenModal, monitor}) {
	if (monitor === null) return null;
	const components = []; 
	monitor.content.forEach(item=>{
		switch (item.type){
			case "header":
				components.push(
				<p style={{ fontSize: 23, fontWeight: 500, paddingBottom: 10, paddingTop:10 }}>
					{item.content}
				</p>
				)
			break
			case "purpose":
				components.push(
					<p style={{ fontSize: 17 }}>{item.content}</p>
				)
			break
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
				)
			break
			case "section": 
				components.push(
					<p style={{ fontWeight: 700, fontSize: 17 }}>{item.content}</p>
				)
			break
			case "instruction":
				components.push(
					<p style = {{paddingBottom: 10}}> {item.content} </p>
				)
			break
			default:{
				components.push(
					<p
				style={{ fontStyle: "italic", paddingBottom: 10 }} 
				>
				{item.content}
			</p>
				)}
		}
	})
	return (
		<Modal show={openModal} onHide={() => setOpenModal(false)} centered>
			<Row style={{ padding: 20 }}>
				{components}
			</Row>
		</Modal>
	);
}
