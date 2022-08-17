import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

interface ClientMetaData {
  color: number;
  id: string;
}

const wss = new WebSocketServer({
  port: 8080,
});

const clients = new Map<WebSocket.WebSocket, ClientMetaData>();

wss.on("connection", (ws) => {
  console.log("Client connected");

  const id = uuid();
  const color = Math.floor(Math.random() * 360);
  const metadata: ClientMetaData = { id, color };

  clients.set(ws, metadata);

  ws.on("message", (messageAsString) => {
    console.log("Message received");

    const message = JSON.parse(messageAsString.toString("utf-8"));
    const metadata: ClientMetaData = clients.get(ws)!;

    message.sender = metadata.id;
    message.color = metadata.color;

    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      if (clients.get(client)!.id !== message.sender) client.send(outbound);
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});
