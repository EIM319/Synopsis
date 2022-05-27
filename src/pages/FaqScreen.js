import { Accordion, Container } from "react-bootstrap";
import Linkify from "react-linkify/dist/components/Linkify";
import questions from "../mockdata/questions_answers.json";

export default function FaqScreen() {
	const categories = [];
	questions.data.forEach((category) => {
		const items = [];
		for (let i = 0; i < category.items.length; i++) {
			const data = category.items[i];
			const answers = [];
			data.answer.forEach((answer) => {
				answers.push(<p>{answer}</p>);
			});
			items.push(
				<Accordion.Item eventKey={i}>
					<Accordion.Header>
						<p style={{ fontSize: 17, fontWeight: 500 }}>
							{data.question}
						</p>
					</Accordion.Header>
					<Accordion.Body>
						<Linkify>{answers}</Linkify>
					</Accordion.Body>
				</Accordion.Item>
			);
		}
		categories.push(
			<div style={{ paddingBottom: 50 }}>
				<p
					style={{
						fontSize: 23,
						fontWeight: 500,
						paddingBottom: 10,
						color: "var(--accent)",
					}}
				>
					{category.category}
				</p>
				<Accordion defaultActiveKey={["0"]} alwaysOpen>
					{items}
				</Accordion>
			</div>
		);
	});

	return (
		<Container style={{ padding: 20 }}>
			<p className="sectionHeader">Frequently Asked Questions</p>
			{categories}
		</Container>
	);
}
