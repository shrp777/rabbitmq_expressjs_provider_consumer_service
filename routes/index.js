import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json("Hello World !");
});

export default router;
