import { useState, MouseEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setUserName, setToken } = useContext(AppContext);
	const navigate = useNavigate();
	// Try to login by sending email and password to server
	const handleSubmit = async (e: MouseEvent) => {
		e.preventDefault();
		await fetch("http://localhost:8000/api/v1/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === "success") {
					setUserName?.(res.data.userName);
					setToken?.(res.data.token);
					navigate("/", { replace: true });
					alert("Successfully login");
				} else {
					alert(res.message);
				}
			})
			.catch((err) => console.error(err));
	};
	return (
		<div id="login-box">
			<p>LOGIN</p>
			<form id="login-form">
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
				<input type="submit" value="Login" onClick={handleSubmit} />
			</form>
		</div>
	);
}
