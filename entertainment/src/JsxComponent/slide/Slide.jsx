import tvSeries from "../../assets/icon-category-tv.svg";
import movieShape from "../../assets/icon-category-movie.svg";
import bookmark from "../../assets/icon-bookmark-empty.svg";
import fillBookmark from "../../assets/icon-bookmark-full.svg";
import iconplay from "../../assets/icon-play.svg";
import { useState, useEffect } from "react";
import "./slide.scss";

export default function Slide(data) {
	const [isitmobile, settype] = useState(
		window.screen.width >= 600 ? false : true
	);
	const [isbookmarked, setbookmarked] = useState(false);
	//when hover on film show the play button
	const [playMovie, setmovieplayed] = useState(false);
	// use to know the size of the page
	useEffect(
		(ev) => {
			window.addEventListener("resize", (e) => {
				if (e.target.screen.availWidth >= 600 && isitmobile == true) {
					settype(false);
				} else if (e.target.screen.availWidth < 600 && isitmobile == false) {
					settype(true);
				}
			});
		},
		[window.screen.availWidth]
	);

	useEffect((ev) => {
		setbookmarked(data.isbookmarked);
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
		<div
			className="slide"
			style={{
				backgroundImage: `url(${
					isitmobile
						? data.thumbnail.regular.small
						: data.thumbnail.regular.large
				})`,
			}}
			onMouseOver={onmouseEnter}
			onMouseLeave={onMoueleave}>
			<div
				className="slide__overlay"
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

			<button
				id={data.id}
				onClick={handleBookmark}
				className="slide__bookmarkButton">
				{" "}
				<img
					src={isbookmarked ? bookmark : fillBookmark}
					alt="bookmark"
				/>
			</button>

			<p className="slide__data">
				{data.year}{" "}
				<span>
					{" "}
					<img
						src={data.category == "Movie" ? movieShape : tvSeries}
						alt="categeory"
					/>
					{data.category == "Movie" ? "Movie" : "TV Series"}
				</span>{" "}
				{!isitmobile && data.rating}
			</p>
			<h2>{data.title}</h2>
			<div className="mobile__rating">{isitmobile && data.rating}</div>
		</div>
	);
}
