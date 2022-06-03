import { Container } from "react-bootstrap";
import addNotes from "../mockdata/add_notes.json";

export default function AdditionalNoteScreen() {
	const DisplayData = addNotes.map((notes) => {
		return (
			<tr>
				<td style={{ fontWeight: 500, fontSize: 17 }}>{notes.title}</td>
				<td>{notes.value}</td>
			</tr>
		);
	});

	return (
		<Container style={{ padding: "20, 10, 20, 10" }}>
			<div style={{ maxWidth: 1000 }}>
				<p className="sectionHeader">Additional Notes</p>
				<p className="paragraph">
					Additional notes from the doctor, including diet and
					activity restrictions, are stated below.
				</p>
				<br />
				<table class="table table-striped">
					<tbody>{DisplayData}</tbody>
				</table>
			</div>
		</Container>
	);
}
