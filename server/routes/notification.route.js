import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
} from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

// Get all notifications for logged-in user
notificationRouter.get("/", isAuth, getNotifications);

// Mark single notification as read
notificationRouter.put("/:id/read", isAuth, markAsRead);

// Mark all notifications as read
notificationRouter.put("/read-all", isAuth, markAllAsRead);

export default notificationRouter;
