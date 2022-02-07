import "./App.css";
import { useContext, useRef, useLayoutEffect, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header, Login, Register, Home } from "./components";
import { AppContext } from "./contexts";

function App() {
	const { token, posts, setUserName, setPosts, setToken, updatedPosts } =
		useContext(AppContext);
	useLayoutEffect(() => {
		// Check if user refresh the page
		if (performance.getEntriesByType("navigation").length > 0) {
			(async () => {
				const token = localStorage.getItem("token");
				if (token) {
					// now send token to keep login status
					await fetch("http://localhost:8000/api/v1", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
						.then((res) => res.json())
						.then((res) => {
							if (res.userName) {
								setUserName?.(res.userName);
							}
						});
				}
			})();
		}
	});
	// Get all posts to home page
	useEffect(() => {
		(async () => {
			await fetch("http://localhost:8000/api/v1/posts")
				.then((res) => res.json())
				.then((res) => {
					// ! res.posts never undefined, it always an array or empty array
					// ! so that if don't check the length, page will make infinite request
					if (res.posts.length > 0) {
						setPosts?.(res.posts);
					}
				});
		})();
	}, [posts]);
	// Check if user is logged in (token is not null)
	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			const token = localStorage.getItem("token");
			if (token) {
				setToken?.(token);
			}
		}
	}, [token]);
	return (
		<>
			<Routes>
				<Route element={<Header />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
