import { Row, Col } from "react-bootstrap";
import CalendarComponent from "../components/todo/CalendarComponent";

export default function ToDoListScreen() {
	return (
		<Row style={{ width: "100%" }}>
			<Col lg={6}>
				<CalendarComponent />
			</Col>
			<Col lg={6}></Col>
		</Row>
	);
}
