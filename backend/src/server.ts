import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.0.0.1"]);

import app from "./app.js";
import { env } from "./config/env.js";
import { connectToMongoDB } from "./config/connectDB.js";

const PORT = env.PORT;

// MONGODB CONNECTION
await connectToMongoDB();

// SWITCH ON THE SERVER
app.listen(PORT, () => {
    console.log("Server running on Port: ", PORT);
});
