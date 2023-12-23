"use client";

import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import styles from "./page.module.css";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default function Page() {
	const [message, setMessage] = useState("");
	const { sendMessage, messages } = useSocket();
	const { user, isLoading } = useUser();

	function handleSend() {
		sendMessage(message);
		setMessage("");
	}

	if (isLoading) return <div className={styles.main}>Loading...</div>;

	return (
		<>
			<main className={styles.main}>
				<div>
					<h1>College community Chat</h1>
					<p>powered with Redis</p>
					<div className={styles.messagesContainer}>
						{messages.map((msg, i) => (
							<div className={styles.messageBubble} key={i}>
								<p className={styles.messageBody}>{msg}</p>
								<p className={styles.userName}>~ {user?.nickname}</p>
							</div>
						))}
					</div>
				</div>
				{user ? (
					<div className={styles.inputContainer}>
						<input
							type='text'
							placeholder='Type a message...'
							className={styles.chatInput}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button onClick={() => handleSend()} className={styles.button}>
							Send
						</button>
					</div>
				) : (
					<div>Login to join the chat</div>
				)}
			</main>
		</>
	);
}
