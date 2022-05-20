import React from 'react';
import Data from "./data.json";

export default function LabResultScreen() {
	return (
		<div className="LabResultScreen">
			<div className="posts">
				{ Data.map(post => {
					return(
						<div key={post.id } className="post">
							<h3>{ post.title } </h3>
							<p>{ post.content }</p>
						</div>
					)
				}) }
			</div>
			Access Lab Reports and Analysis below
		</div>
	);
}
