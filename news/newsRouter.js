import { getAllNews, getNewsById, deleteNewsById } from "./newsController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const newsRouter = express.Router();

newsRouter.get("/all/news", getAllNews);
newsRouter.get("/news/:id", getNewsById);
newsRouter.delete("/delete-news/:id", authMiddleware, deleteNewsById);

export default newsRouter;
