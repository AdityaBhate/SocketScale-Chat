"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
	children?: React.ReactNode;
}

interface ISocketContext {
	sendMessage: (msg: string) => any;
	messages: string[];
	id?: string;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
	const state = useContext(SocketContext);
	if (!state) throw new Error("SocketProvider not found");

	return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
	const [socket, setSocket] = React.useState<Socket | undefined>(undefined);
	const [messages, setMessages] = React.useState<string[]>([]);
	const [id, setId] = React.useState<string | undefined>(undefined);

	const sendMessage: ISocketContext["sendMessage"] = useCallback(
		(msg) => {
			if (socket) {
				socket.emit("event:message", { message: msg, senderId: id });
			}
		},
		[socket]
	);

	const onMessageRec = useCallback((msg: string) => {
		console.log("On message received", msg);
		const { message } = JSON.parse(msg) as { message: string };
		setMessages((prev) => [...prev, message]);
	}, []);

	useEffect(() => {
		const _socket = io("http://localhost:8000");
		_socket.on("connect", () => {
			const myId = _socket.id;
			setId(myId);
		});
		_socket.on("message", (msg: string) => {
			const { message } = JSON.parse(msg) as {
				message: string;
			};
			console.log("Received my message:", message);
			onMessageRec(msg);
		});
		setSocket(_socket);
		return () => {
			_socket.off("message", onMessageRec);
			_socket.disconnect();
			setSocket(undefined);
		};
	}, []);

	return (
		<SocketContext.Provider value={{ sendMessage, messages, id }}>
			{children}
		</SocketContext.Provider>
	);
};
