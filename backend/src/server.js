import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import dns from "node:dns";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    //await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
