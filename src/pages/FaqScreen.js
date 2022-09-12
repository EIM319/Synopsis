import { Accordion, Container } from "react-bootstrap";
import Linkify from "react-linkify/dist/components/Linkify";
import questions from "../mockdata/questions_answers.json";
import { CgInfo } from "react-icons/cg";

export default function FaqScreen() {
	const categories = [];
	questions.data.forEach((category) => {
		const items = [];
		for (let i = 0; i < category.items.length; i++) {
			const data = category.items[i];
			const answers = [];
			data.answer.forEach((answer) => {
				answers.push(<p style={{ paddingBottom: 5 }}>{answer}</p>);
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
		<div style={{ width: "100%" }}>
			<div
				style={{
					background: "var(--accent)",
					color: "white",
					width: "100%",
					padding: 30,
				}}
			>
				<Container style={{ maxWidth: 1000 }}>
					<p className="sectionHeader">
						Frequently Asked Questions <CgInfo size={30} />
					</p>
					<p className="paragraph">
						If you have any queries that are not addressed below,
						please contact{" "}
						<a href="tel:64722000" style={{ color: "white" }}>
							6472 2000
						</a>
						.
					</p>
				</Container>
			</div>
			<Container style={{ maxWidth: 1000, padding: "30px 10px" }}>
				<div style={{ paddingBottom: 50 }}>{categories}</div>
			</Container>
		</div>
	);
}
