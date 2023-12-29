import Nav from "../../JsxComponent/Nav/Nav";
import Movie from "../../JsxComponent/movieComponent/Movie";
import SearchBar from "../../JsxComponent/searchBar/Search";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import data from "../../data.json";
export default function MoviePage() {
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
						return e.category == "Movie";
					})
				);
			} else {
				setfilms(
					data.filter((e) => {
						return (
							e.title.toLocaleLowerCase().search(query.toLocaleLowerCase()) >=
								0 &&
							e.category == "Movie" &&
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
					placeholder="movies"
					takesearchdata={takesearchdata}
				/>
				<section className="container">
					<h2 className="sectionheader">
						{!query ? "Movies" : `Found ${films.length} results for ‘${query}’`}
					</h2>
					<div className="movieContainer">
						{films.map((movie) => {
							return (
								<Movie
									key={nanoid()}
									{...movie}
								/>
							);
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
