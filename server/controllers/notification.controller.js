import Notification from "../models/notification.model.js";

// Get all notifications for logged-in user
export const getNotifications = async (req, res) => {
    try {
        const userId = req.userId;

        const notifications = await Notification.find({ user: userId })
            .populate("relatedJob", "title")
            .populate("relatedApplication")
            .sort({ createdAt: -1 }) // newest first
            .limit(50); // last 50 notifications

        const unreadCount = await Notification.countDocuments({
            user: userId,
            isRead: false,
        });

        res.status(200).json({
            notifications,
            unreadCount,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Failed to fetch notifications" });
    }
};

// Mark a single notification as read
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const notification = await Notification.findOne({ _id: id, user: userId });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Failed to mark notification as read" });
    }
};

// Mark all notifications as read for logged-in user
export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.userId;

        await Notification.updateMany(
            { user: userId, isRead: false },
            { isRead: true }
        );

        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        res.status(500).json({ message: "Failed to mark all as read" });
    }
};
