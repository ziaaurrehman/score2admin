import { deleteNotification, sendNotification } from "../../Api";

const NotificationItem = ({ notification }) => {
  // Delete notif function
  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      console.log("Notification deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Send notif function
  const handleSendNotification = async (id) => {
    try {
      await sendNotification(id);
      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  return (
    <div className="w-full flex justify-between text-sm items-center">
      <p className="text-blue-500 w-[25%]">{notification.title}</p>
      <div className="overflow-none w-[50%] text-center">
        <p className="font-normal line-clamp-1">{notification.body}</p>
      </div>
      <div className="w-[25%] flex gap-3 justify-end items-center text-xs">
        <button
          className="p-2 uppercase h-max bg-green-600 text-center text-white font-semibold rounded-md shadow-md transition cursor-pointer hover:bg-green-800 active:scale-95"
          onClick={() => sendNotification(notification._id)}
        >
          Send
        </button>
        <button
          className="p-2 uppercase h-max bg-red-600 text-center text-white font-semibold rounded-md shadow-md transition cursor-pointer hover:bg-red-800 active:scale-95"
          onClick={() => handleDelete(notification._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
