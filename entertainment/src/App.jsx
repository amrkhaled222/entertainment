import { useState } from "react";
import Signup from "./pages/authocationPage/Signup";
import SigniIn from "./pages/authocationPage/SigniIn";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePgae/Home";
import MoviePage from "./pages/moviePage/MoviePage";
import TVSeries from "./pages/TVSeries/TVSeries";
import BMark from "./pages/BookMark/BMark";
function App() {
	return (
		<main>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/TvSeries"
					element={<TVSeries />}
				/>
				<Route
					path="/bookMark"
					element={<BMark />}
				/>
				<Route
					path="/movie"
					element={<MoviePage />}
				/>

				<Route
					path="/signIn"
					element={<SigniIn />}
				/>
				<Route
					path="/signUp"
					element={<Signup />}
				/>
			</Routes>
		</main>
	);
}

export default App;
