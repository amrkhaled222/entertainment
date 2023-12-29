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
		repeatedPassword: "",
	});

	// state to sure that data validation
	const [datavalidation, setdatavalidation] = useState({
		isemailvalid: true,
		passwordvalid: true,
		isRepeatedRight: true,
	});

	// function to take data from input to state

	const takedata = (e) => {
		let data = e.target.value,
			dataname = e.target.name;
		console.log(e, data, dataname);

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

	//to make pass more than 8 char with special char and lower upper case and number
	const passwordvalidation = (e) => {
		let passregx =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (userdata.password.match(passregx)) {
			//use more back end here
			setdatavalidation((e) => {
				return {
					...e,
					passwordvalid: true,
				};
			});
		} else {
			setdatavalidation((e) => {
				return {
					...e,
					passwordvalid: false,
				};
			});
		}
	};
	// to make sure the repeated pass = the essential pass
	const repeatedPasswordvalidation = (e) => {
		if (userdata.password == userdata.repeatedPassword) {
			setdatavalidation((e) => {
				return {
					...e,
					isRepeatedRight: true,
				};
			});
		} else {
			setdatavalidation((e) => {
				return {
					...e,
					isRepeatedRight: false,
				};
			});
		}
	};

	const buttonHandler = (e) => {
		if (
			!datavalidation.passwordvalid ||
			!datavalidation.isemailvalid ||
			!datavalidation.isRepeatedRight
		) {
			e.preventDefault();
		}
		//back end here
	};
	return (
		<div className="container signup">
			<img
				src={logo}
				alt="logo"
			/>
			<form
				action=""
				method="post">
				<h1>sign up</h1>
				<div className="inputContainer">
					<input
						className="input "
						name="email"
						placeholder="email address"
						style={{
							borderBottom:
								datavalidation.isemailvalid == false && "1px solid #FC4747 ",
						}}
						type="input"
						onBlur={emailvalidation}
						onChange={takedata}
					/>
					<span
						style={{ display: datavalidation.isemailvalid != false && "none" }}
						className="validationmassege">
						enter valid email
					</span>
				</div>

				<div className="inputContainer">
					<input
						name="password"
						className="input"
						style={{
							borderBottom:
								datavalidation.passwordvalid == false && "1px solid #FC4747 ",
						}}
						placeholder="password"
						type="password"
						onBlur={passwordvalidation}
						onChange={takedata}
					/>
					<span
						style={{ display: datavalidation.passwordvalid != false && "none" }}
						className="validationmassege">
						enter valid password
					</span>
				</div>

				<div className="inputContainer">
					<input
						name="repeatedPassword"
						className="input"
						style={{
							borderBottom:
								datavalidation.isRepeatedRight == false && "1px solid #FC4747 ",
						}}
						placeholder="repeat password"
						type="password"
						onBlur={repeatedPasswordvalidation}
						onChange={takedata}
					/>
					<span
						style={{
							display: datavalidation.isRepeatedRight != false && "none",
						}}
						className="validationmassege">
						password didn't match
					</span>
				</div>
				<button
					className="signinbutton"
					onClick={buttonHandler}>
					create an account
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
					Already have an account? <Link to="/signIn"> login</Link>{" "}
				</p>
			</form>
		</div>
	);
}
