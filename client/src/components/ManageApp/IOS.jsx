import { useState } from "react";
import { androidCreateSettings } from "../../Api";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const IOS = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    android_privacy_policy: "",
    android_terms_conditions: "",
    android_app_share_link: "",
    app_default_page: "",
    required_enable_app: "",
    application_id: "",
    app_url: "",
    app_name: "",
    description: "",
  });

  // Handle Drag enter
  const {
    android_privacy_policy,
    android_terms_conditions,
    android_app_share_link,
    app_default_page,
    required_enable_app,
    application_id,
    app_url,
    app_name,
    description,
  } = data;
  const handlefile = (event) => {
    setFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  // Handle Drag enter
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    // console.log(files);
    setFile(files[0]);
    setPreviewImage(URL.createObjectURL(files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFormData = (values) => {
    var formData = new FormData();
    formData.append("android_privacy_policy", values?.android_privacy_policy);
    if (!file) formData.append("filename", file);
    formData.append(
      "android_terms_conditions",
      values?.android_terms_conditions
    );
    formData.append("android_app_share_link", values?.android_app_share_link);
    formData.append("app_default_page", values?.app_default_page);
    formData.append("required_enable_app", values?.required_enable_app);
    formData.append("application_id", values?.application_id);
    formData.append("app_url", values?.app_url);
    formData.append("app_name", values?.app_name);
    formData.append("description", values?.description);

    return formData;
  };
  console.log(data);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await androidCreateSettings(handleFormData(data));
      console.log(res);
      if (res?.data?.success) {
        toast.success(`${res?.data?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <div className="w-full rounded-md flex flex-col gap-2 bg-gray-300 p-2">
      <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
        <h2 className="text-sm font-semibold">GENERAL SETTINGS</h2>
        <div className="w-full flex gap-2">
          <div className="w-1/4">
            <label className="text-xs font-bold">iOS Privacy Policy</label>
            <input
              type="text"
              value={android_privacy_policy}
              name="android_privacy_policy"
              onChange={handleChange}
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">iOS Terms Conditions</label>
            <input
              type="text"
              value={android_terms_conditions}
              onChange={handleChange}
              name="android_terms_conditions"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">iOS App Share Link</label>
            <input
              type="text"
              value={android_app_share_link}
              name="android_app_share_link"
              onChange={handleChange}
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">App Default Page</label>
            <input
              type="text"
              value={app_default_page}
              name="app_default_page"
              onChange={handleChange}
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="Home"
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[32%]">
            <label className="text-xs font-bold">
              Notification Type{" "}
              <span className="text-red-600 font-bold">*</span>
            </label>
            <select
              className="border-2 border-gray-300 rounded-md py-[0.2rem] text-xs focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-[100%]"
              name="notification_type"
            >
              <option value="">Select One</option>
              <option value="fcm">FCM</option>
              <option value="one_signal">OneSignal</option>
            </select>
          </div>

          <div className="w-[32%]">
            <label className="text-xs font-bold">
              Firebase Server Key{" "}
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="firebase_server_key"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="AAAAuAMrck0:APA91bGiNMQxlnPtOOVULTFaqRbdwLTGHdRjNyiV55A0STR0TPYWhpEgCpckBNXwPOYuLv5CkVuZneJAH87nQQZCkq5ELMpT0Z_JO-TSyVUctOcuHaf215o1efOs83ekAnKzuOUFoxL1"
            />
          </div>

          <div className="w-[32%]">
            <label className="text-xs font-bold">
              Firebase Topic <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="firebase_topic"
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="high_importance_channel"
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[49%]">
            <label className="text-xs font-bold">
              IP API Key <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="text"
              name="ip_api_key"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="WT29xOIs0sf8ZyWwaeyiyRC20ZGtGiGB02Z0eTnwwbO10BoMOe"
            />
          </div>

          <div className="w-[49%]">
            <label className="text-xs font-bold">Highlights Type</label>
            <select
              className="border-2 border-gray-300 rounded-md py-[0.2rem] text-xs outline-none w-[100%]"
              name="highlights_type"
            >
              <option value="">Select One</option>
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
              <option value="youtube">YouTube Only</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
        <h2 className="text-sm font-semibold">REQUIRED APP</h2>
        <div className="w-full flex gap-2">
          <div className="w-1/4">
            <label className="text-xs font-bold">Required Enabled App</label>
            <select
              className="border-2 border-gray-300 rounded-md py-[0.2rem] text-xs outline-none w-[100%]"
              name="enable_app"
            >
              <option value="">Select One</option>
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">Application ID</label>
            <input
              type="text"
              value={application_id}
              name="application_id"
              onChange={handleChange}
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">App URL</label>
            <input
              type="text"
              value={app_url}
              name="app_url"
              onChange={handleChange}
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>

          <div className="w-1/4">
            <label className="text-xs font-bold">App Name</label>
            <input
              type="text"
              value={app_name}
              name="app_name"
              onChange={handleChange}
              className="border-2 block w-full rounded-md border-gray-200 p-1 text-xs"
              placeholder="N/A"
            />
          </div>
        </div>
        <div className="mt-3 w-full flex flex-col gap-1">
          <label className="text-xs font-bold">DESCRIPTION</label>
          <textarea
            value={description}
            onChange={handleChange}
            name="description"
            className="rounded-md w-full border-2 border-gray-300"
          />
        </div>
      </div>

      <div
        id="drag-and-drop"
        className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
      >
        <h2 className="text-sm font-semibold">LOGO</h2>
        {previewImage ? (
          <div className="bg-gray-400 rounded-md p-3 flex gap-3 items-center">
            <img
              src={previewImage}
              alt="app-icon"
              className="w-[150px] h-[150px] rounded-md"
            />
            <FaTrash
              onClick={() => {
                setFile(null);
                setPreviewImage(null);
              }}
              className="text-red-600 text-2xl cursor-pointer hover:text-red-900"
            />
          </div>
        ) : (
          <div
            id="drag-and-drop"
            className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
          >
            <div
              className={`w-full flex justify-center transition-all items-center border-2 border-dashed border-gray-400 rounded-md ${
                dragging ? "bg-blue-400" : "bg-blue-200"
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col justify-center items-center gap-2 p-2">
                <h4 className="text-sm font-semibold text-gray-600">
                  Drag & Drop Image here
                </h4>
                {file ? (
                  <h4 className="text-sm font-semibold text-gray-600">
                    {file?.name}
                  </h4>
                ) : null}

                <p className="text-gray-400 text-center">OR</p>
                <input
                  type="file"
                  name="upload"
                  id="upload-img"
                  onChange={handlefile}
                  className="text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-md p-1 w-3/4"
                />
                <p className="text-xs text-orange-500 text-center">
                  Maximum Size: 1MB
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="text-sm my-4 font-semibold right-12 bottom-5 bg-blue-600 py-2 px-4 text-white uppercase hover:bg-blue-800 transition active:scale-95 rounded-md shadow-lg"
          onClick={(e) => handleSave(e)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default IOS;
