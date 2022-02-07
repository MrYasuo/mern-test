import { useState, MouseEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts";

export default function Register() {
	const { setUserName, setToken } = useContext(AppContext);
	const [name, setName] = useState(String);
	const [email, setEmail] = useState(String);
	const [password, setPassword] = useState(String);
	const navigate = useNavigate();
	// Try to register by sending name, email and password to server
	const handleSubmit = async (e: MouseEvent) => {
		e.preventDefault();
		await fetch("http://localhost:8000/api/v1/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					setUserName?.(res.data.userName);
					setToken?.(res.data.token);
					alert("Successfully registered");
					navigate("/", { replace: true });
				}
			})
			.catch((err) => alert(err));
	};
	return (
		<div id="register-box">
			<p>CREATE NEW ACCOUNT</p>
			<form id="register-form">
				<input
					type="text"
					placeholder="Name"
					name="name"
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value="Register" onClick={handleSubmit} />
			</form>
		</div>
	);
}
