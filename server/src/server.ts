import * as http from "http";
import { AddressInfo } from "net";
import mongoose from "mongoose";
import App from "./App";
import { MONGODB_URI, } from "./config";
const app: App = new App();
let server: http.Server;

const PORT: any = process.env.PORT || 3000;

function serverError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
        throw error;
    }
    throw error;
}

function serverListening(): void {
    const addressInfo: AddressInfo = <AddressInfo>server.address();
    console.info(`api Listening on ${addressInfo.address}:${PORT}`);
}

(async () => {
    const connectionString = MONGODB_URI ?? ""
    mongoose.connect(connectionString)
        .then(() => console.log("connected"));

})().then(() => app.init().then(() => {
    app.express.set("port", PORT);

    server = app.httpServer;
    server.on("error", serverError);
    server.on("listening", serverListening);
    server.listen(PORT);
}).catch((err: Error) => {
    console.info("app.init error");
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
}));

process.on("unhandledRejection", (reason: Error) => {
    console.error("Unhandled Promise Rejection: reason:", reason.message);
    console.error(reason.stack);
});