import "./signin.scss";
import logo from "../../assets/logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/google-icon.svg";
import facbookIcon from "../../assets/facebook-icon.svg";
export default function SignIn() {
	// state to take all user data
	const [userdata, setuserdata] = useState({
		email: "",
		password: "",
	});

	// state to sure that data validation
	const [datavalidation, setdatavalidation] = useState({
		isemailvalid: true,
		passwordvalid: true,
	});

	// function to take data from input to state

	const takedata = (e) => {
		let data = e.target.value,
			dataname = e.target.name;

		setuserdata((e) => {
			return { ...e, [dataname]: data };
		});
	};

	//email validation
	const emailvalidation = (e) => {
		let emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

		if (userdata.email.match(emailregex)) {
			//use more back end here
			setdatavalidation((e) => {
				return {
					...e,
					isemailvalid: true,
				};
			});
		} else {
			setdatavalidation((e) => {
				return {
					...e,
					isemailvalid: false,
				};
			});
		}
	};

	const buttonHandler = (e) => {
		if (!datavalidation.isemailvalid) {
			e.preventDefault();
		}
		//back end here
	};
	return (
		<div className="container signin">
			<img
				src={logo}
				alt="logo"
			/>
			<form action="">
				<h1>login</h1>
				<input
					className="input"
					name="email"
					placeholder="email address"
					style={{
						borderBottom:
							datavalidation.isemailvalid == false && "1px solid #FC4747 ",
					}}
					type="input"
					onChange={takedata}
					onBlur={emailvalidation}
				/>

				<input
					className="input"
					placeholder="password"
					type="password"
					onChange={takedata}
				/>
				<span
					style={{ display: datavalidation.isemailvalid != false && "none" }}
					className="signinValidation">
					enter valid email
				</span>
				<button
					className="signinbutton"
					onClick={buttonHandler}>
					login to your account
				</button>

				<button
					className="signinbutton signinbutton--Google"
					onClick={buttonHandler}>
					<img
						src={googleIcon}
						alt="googleIcon"
					/>{" "}
					continue with Google
				</button>
				<button
					className="signinbutton signinbutton--facebook"
					onClick={buttonHandler}>
					<img
						src={facbookIcon}
						alt="facbookIcon"
					/>
					continue with Facebook
				</button>
				<p>
					Don’t have an account? <Link to="/signUp"> Sign up</Link>{" "}
				</p>
			</form>
		</div>
	);
}
