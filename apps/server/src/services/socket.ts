import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
	host: "redis-19662.c212.ap-south-1-1.ec2.cloud.redislabs.com",
	port: 19662,
	username: "default",
	password: "5DgJZ05mN2nsoA2GNbDzmiSDHe8ISZ6U",
});
const sub = new Redis({
	host: "redis-19662.c212.ap-south-1-1.ec2.cloud.redislabs.com",
	port: 19662,
	username: "default",
	password: "5DgJZ05mN2nsoA2GNbDzmiSDHe8ISZ6U",
});

class SocketService {
	private _io: Server;

	constructor() {
		console.log("Initializing socket service...");
		this._io = new Server({
			cors: {
				allowedHeaders: ["*"],
				origin: "*",
			},
		});

		sub.subscribe("MESSAGES");
	}

	public initListeners() {
		console.log("Initializing socket listeners...");
		this._io.on("connect", (socket) => {
			console.log("New connection: " + socket.id);

			socket.on("event:message", async ({ message }: { message: string }) => {
				console.log("New message received: " + message);
				pub.publish("MESSAGES", JSON.stringify({ message }));
			});

			socket.on("disconnect", () => {
				console.log("Disconnected: " + socket.id);
			});
		});

		sub.on("message", (channel, message) => {
			if (channel !== "MESSAGES") return;
			this._io.emit("message", message);
			console.log("Message received: " + message);
		});
	}

	get io() {
		return this._io;
	}
}

export default SocketService;
