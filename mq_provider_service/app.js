import express from "express";
import logger from "morgan";
import messagesRoutes from "./routes/messagesRoutes.js";

import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/messages", messagesRoutes);

export default app;
