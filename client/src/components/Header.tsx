import {
	useContext,
	useState,
	useRef,
	forwardRef,
	useEffect,
	useLayoutEffect,
	MouseEvent,
} from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../contexts";

function Header() {
	const { userName } = useContext(AppContext);
	const refHeader = useRef<HTMLDivElement>(null);
	const refContainer = useRef<HTMLDivElement>(null);
	let location = useLocation();
	// Check the path of location to determine which type of header to show
	const checkLocationUser = () => {
		if (location.pathname === "/login") {
			return <p>LOGIN PAGE</p>;
		}
		if (location.pathname === "/register") {
			return <p>REGISTER PAGE</p>;
		}
		if (userName) {
			return <p>USER VIEW</p>;
		}
		return <p>GUEST VIEW</p>;
	};
	// prefer useLayoutEffect to useEffect in order to smooth the transition
	useLayoutEffect(() => {
		if (refContainer.current) {
			refContainer.current.style.top = refHeader?.current?.offsetHeight + "px";
		}
	}, [refHeader, refContainer]);
	// Logout easy by remove the token
	const handleLogout = (e: MouseEvent) => {
		e.preventDefault();
		localStorage.removeItem("token");
		window.location.reload();
	};
	return (
		<>
			<div id="header" ref={refHeader}>
				<div id="view-type">{checkLocationUser()}</div>
				<div id="app-title">
					<Link to="/" style={{ color: "white", textDecoration: "none" }}>
						twitter
					</Link>
				</div>
				{userName ? (
					<div id="header-link">
						<p style={{ color: "#408093" }}>Hello, {userName}</p>
						<Link to="/" onClick={handleLogout}>
							Logout
						</Link>
					</div>
				) : (
					<div id="header-link">
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</div>
				)}
			</div>
			<div id="container" ref={refContainer}>
				<Outlet />
			</div>
		</>
	);
}

export default forwardRef(Header);
