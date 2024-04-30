const NotificationSettings = () => {
  return (
    <div className="w-full p-5">
      <div className="w-full flex">
        <div className="w-33%">
          <label>
            Notification Type <span className="text-red font-bold">*</span>
          </label>
          <select
            className="border-2 border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
            name="notification_type"
          >
            <option value="">Select One</option>
            <option value="fcm">FCM</option>
            <option value="one_signal">OneSignal</option>
          </select>
        </div>

        <div className="w-33%">
          <label className="text-xs font-bold">
            Firebase Server Key <span className="text-red font-bold">*</span>
          </label>
          <input
            type="text"
            name="firebase_server_key"
            className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
            placeholder="AAAAuAMrck0:APA91bGiNMQxlnPtOOVULTFaqRbdwLTGHdRjNyiV55A0STR0TPYWhpEgCpckBNXwPOYuLv5CkVuZneJAH87nQQZCkq5ELMpT0Z_JO-TSyVUctOcuHaf215o1efOs83ekAnKzuOUFoxL1"
          />
        </div>

        <div className="w-33%">
          <label className="text-xs font-bold">
            Firebase Topic <span className="text-red font-bold">*</span>
          </label>
          <input
            type="text"
            name="firebase_topic"
            className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
            placeholder="high_importance_channel"
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
