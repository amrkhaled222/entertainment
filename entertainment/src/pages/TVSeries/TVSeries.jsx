import Nav from "../../JsxComponent/Nav/Nav";
import Movie from "../../JsxComponent/movieComponent/Movie";
import SearchBar from "../../JsxComponent/searchBar/Search";
import data from "../../data.json";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
export default function TVSeries() {
	const [query, setQuery] = useState("");
	const [films, setfilms] = useState([]);
	const takesearchdata = (e) => {
		e.preventDefault();
		setQuery(e.target[0].value);
	};

	useEffect(
		(e) => {
			if (!query) {
				setfilms(
					data.filter((e) => {
						return e.category == "TV Series";
					})
				);
			} else {
				setfilms(
					data.filter((e) => {
						return (
							e.title.toLocaleLowerCase().search(query.toLocaleLowerCase()) >=
								0 &&
							e.category == "TV Series" &&
							e
						);
					})
				);
			}
		},
		[query]
	);
	return (
		<div className="layout">
			<Nav />
			<div className="mainContent">
				<SearchBar
					placeholder="TV Series"
					takesearchdata={takesearchdata}
				/>
				<section className="container">
					<h2 className="sectionheader">
						{!query
							? "TV Series"
							: `Found ${films.length} results for ‘${query}’`}
					</h2>
					<div className="movieContainer">
						{films.map((film) => {
							return (
								<Movie
									key={nanoid()}
									{...film}
								/>
							);
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
