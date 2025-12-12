import api from "./authCalls.js";

// Get all notifications for logged-in user
export const getNotifications = async () => {
    const response = await api.get("api/notifications");
    return response.data;
};

// Mark a single notification as read
export const markAsRead = async (notificationId) => {
    const response = await api.put(`api/notifications/${notificationId}/read`);
    return response.data;
};

// Mark all notifications as read
export const markAllAsRead = async () => {
    const response = await api.put("api/notifications/read-all");
    return response.data;
};
