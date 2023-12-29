import Nav from "../../JsxComponent/Nav/Nav";
import Movie from "../../JsxComponent/movieComponent/Movie";
import data from "../../data.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import Slide from "../../JsxComponent/slide/Slide";
import SearchBar from "../../JsxComponent/searchBar/Search";
import { nanoid } from "nanoid";
//make request to trending and all movie and tv series here
export default function Home() {
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
					data.map((e) => {
						return e;
					})
				);
			} else {
				setfilms(
					data.filter((e) => {
						return (
							e.title.toLocaleLowerCase().search(query.toLocaleLowerCase()) >=
								0 && e
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
			<div className="mainContent ">
				<SearchBar
					takesearchdata={takesearchdata}
					placeholder="movies or TV series"
				/>

				{!query && (
					<section className="sliderr">
						<h2 className="sectionheader">Trending</h2>

						<Slider
							className="center "
							autoplaySpeed={3000}
							autoplay={true}
							arrows={false}
							slidesToShow={2}
							centerMode={true}
							centerPadding="120"
							responsive={[
								{
									breakpoint: 1410,
									settings: {
										centerPadding: "90",
									},
								},
								{
									breakpoint: 1365,
									settings: {
										centerPadding: "35",
									},
								},
								{
									breakpoint: 1273,
									settings: {
										centerPadding: "-20",
									},
								},
								{
									breakpoint: 1160,
									settings: {
										slidesToShow: 1,
										centerPadding: "211",
									},
								},
								{
									breakpoint: 1060,
									settings: {
										slidesToShow: 1,
										centerPadding: "150",
									},
								},
								{
									breakpoint: 983,
									settings: {
										slidesToShow: 1,
										centerPadding: "100",
									},
								},
								{
									breakpoint: 850,
									settings: {
										slidesToShow: 1,
										centerPadding: "70",
									},
								},

								{
									breakpoint: 650,
									settings: {
										slidesToShow: 1,
										centerPadding: "30",
									},
								},
								{
									breakpoint: 600,
									settings: {
										slidesToShow: 1,
										centerPadding: "150",
									},
								},

								{
									breakpoint: 570,
									settings: {
										slidesToShow: 1,
										centerPadding: "130",
									},
								},
								{
									breakpoint: 511,
									settings: {
										slidesToShow: 1,
										centerPadding: "90",
									},
								},

								{
									breakpoint: 450,
									settings: {
										slidesToShow: 1,
										centerPadding: "60",
									},
								},
							]}>
							{data.map((e) => {
								return (
									e.isTrending && (
										<Slide
											key={nanoid()}
											{...e}
										/>
									)
								);
							})}
						</Slider>
					</section>
				)}
				<section className="container">
					<h2 className="sectionheader">
						{!query
							? "Recomnded for you"
							: `Found ${films.length} results for ‘${query}’`}
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
