import Nav from "../../JsxComponent/Nav/Nav";
import Movie from "../../JsxComponent/movieComponent/Movie";
import SearchBar from "../../JsxComponent/searchBar/Search";
import data from "../../data.json";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
export default function BMark() {
	const [query, setQuery] = useState("");
	const [films, setfilms] = useState([]);
	const [tvSeries, setTvSeries] = useState([]);
	const takesearchdata = (e) => {
		e.preventDefault();
		setQuery(e.target[0].value);
	};

	useEffect(
		(e) => {
			if (!query) {
				setfilms(
					data.filter((e) => {
						return e.category == "Movie" && e.isBookmarked;
					})
				);
				setTvSeries(
					data.filter((e) => {
						return e.category == "TV Series" && e.isBookmarked;
					})
				);
			} else {
				setfilms(
					data.filter((e) => {
						return (
							e.title.toLocaleLowerCase().search(query.toLocaleLowerCase()) >=
								0 &&
							e.category == "Movie" &&
							e.isBookmarked &&
							e
						);
					})
				);
				setTvSeries(
					data.filter((e) => {
						return (
							e.title.toLocaleLowerCase().search(query.toLocaleLowerCase()) >=
								0 &&
							e.category == "TV Series" &&
							e.isBookmarked &&
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
					placeholder="bookmarked shows"
					takesearchdata={takesearchdata}
				/>
				<section className="container">
					<h2 className="sectionheader">
						{!query
							? "Bookmarked Movies"
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
				<section className="container">
					<h2 className="sectionheader">
						{!query
							? "Bookmarked TV Series"
							: `Found ${tvSeries.length} results for ‘${query}’`}
					</h2>
					<div className="movieContainer">
						{tvSeries.map((tv) => {
							return (
								<Movie
									key={nanoid()}
									{...tv}
								/>
							);
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
