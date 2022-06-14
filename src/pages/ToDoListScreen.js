import "../components/todo/Calendar.css";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import CalendarComponent from "../components/todo/CalendarComponent";
import TodoListComponent from "../components/todo/TodoListComponent";

export default function ToDoListScreen({ setScreenIndex, user }) {
	const [date, setDate] = useState(new Date());

	return (
		<Col className="bootstrapColumn">
			<Row className="bootstrapRow">
				<Col
					xs={{ order: 2 }}
					md={{ span: 6, order: 1 }}
					lg={{ span: 5, order: 1 }}
					className="bootstrapColumn"
				>
					<CalendarComponent
						date={date}
						setDate={setDate}
						setScreenIndex={setScreenIndex}
					/>
				</Col>
				<Col
					xs={{ order: 1 }}
					md={{ span: 6, order: 2 }}
					lg={{ span: 7, order: 2 }}
					className="bootstrapColumn"
				>
					<TodoListComponent
						date={date}
						setScreenIndex={setScreenIndex}
						user={user}
					/>
				</Col>
			</Row>
		</Col>
	);
}
