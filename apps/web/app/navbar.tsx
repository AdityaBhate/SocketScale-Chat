"use client";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import styles from "./page.module.css";

const Navbar: React.FC = () => {
	const { user, isLoading } = useUser();
	console.log(user);
	return (
		<nav
			style={{
				position: "sticky",
				top: 0,
				backgroundColor: "#1b1a1a",
				borderBottom: "1px solid #ccc",
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "10px",
				}}>
				<a href={user ? "/api/auth/logout" : "/api/auth/login"}>
					<button className={styles.button}>{user ? "Logout" : "Login"}</button>
				</a>
				<div className={styles.accountContainer}>
					<img
						src={user?.picture || "https://via.placeholder.com/150"}
						alt='user profile picture'
						className={styles.userImage}
					/>
					<span>{user?.name}</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
