import searchIcon from "../../assets/icon-search.svg";
import "./search.scss";
export default function SearchBar(data) {
	return (
		<div className="container searchBar">
			<img
				src={searchIcon}
				alt="searchIcon"
			/>
			<form
				name="serchForm"
				onSubmit={(e) => {
					data.takesearchdata(e);
				}}>
				<input
					type="text"
					placeholder={`Search for ${data.placeholder}`}
				/>
			</form>
		</div>
	);
}
