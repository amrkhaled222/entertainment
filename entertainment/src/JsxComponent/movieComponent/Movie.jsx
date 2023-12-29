import tvSeries from "../../assets/icon-category-tv.svg";
import movieShape from "../../assets/icon-category-movie.svg";
import bookmark from "../../assets/icon-bookmark-empty.svg";
import fillBookmark from "../../assets/icon-bookmark-full.svg";
import iconplay from "../../assets/icon-play.svg";
import { useState, useEffect } from "react";
import "./Movie.scss";

export default function Movie(data) {
	const [screentype, settype] = useState(
		window.screen.width >= 600
			? "mobile"
			: window.screen.width >= 600 && window.screen.width <= 796
			? "tablet"
			: "largeScreen"
	);
	const [isbookmarked, setbookmarked] = useState(false);
	//when hover on film show the play button
	const [playMovie, setmovieplayed] = useState(false);
	// use to know the size of the page
	useEffect(
		(ev) => {
			window.addEventListener("resize", (e) => {
				if (e.target.screen.availWidth < 600 && screentype != "mobile") {
					settype("mobile");
				} else if (
					e.target.screen.availWidth > 600 &&
					e.target.screen.availWidth <= 796 &&
					screentype != "tablet"
				) {
					settype("tablet");
				} else if (screentype != "largeScreen") {
					settype("largeScreen");
				}
			});
		},
		[window.screen.availWidth]
	);

	useEffect((ev) => {
		setbookmarked(data.isBookmarked);
	}, []);
	const onmouseEnter = (e) => {
		setmovieplayed(true);
	};
	const onMoueleave = () => {
		setmovieplayed(false);
	};
	const handleBookmark = (e) => {
		//backend
		setbookmarked((e) => !e);
	};

	return (
		<div className="movie">
			<div
				className="movie__img"
				onMouseOver={onmouseEnter}
				onMouseLeave={onMoueleave}>
				<div
					className="movie__img__playing"
					style={{ display: playMovie ? "flex" : "none" }}>
					<button>
						{" "}
						<img
							src={iconplay}
							alt="playMovie"
						/>{" "}
						play
					</button>
				</div>
				<img
					className="filmImge"
					src={
						screentype == "mobile"
							? data.thumbnail.regular.small
							: screentype == "tablet"
							? data.thumbnail.regular.medium
							: data.thumbnail.regular.large
					}
					alt="movie image"
				/>
				<button
					onClick={handleBookmark}
					className="movie__img--BookmarkIcon">
					{" "}
					<img
						src={isbookmarked ? fillBookmark : bookmark}
						alt="bookmark"
					/>
				</button>
			</div>
			<p className="movie__data">
				{data.year}{" "}
				<span>
					{" "}
					<img
						src={data.category == "Movie" ? movieShape : tvSeries}
						alt="categeory"
					/>
					{data.category == "Movie" ? "Movie" : "TV Series"}
				</span>{" "}
				{data.rating}
			</p>
			<h2>{data.title}</h2>
		</div>
	);
}
