import instance from "axios";
import { toast } from "react-toastify";

const VITE_API_BASE_URL = "http://localhost:5050/api";
const PROD = "https://sportsdashboard.onrender.com/api/";
const axios = instance.create({
  baseURL: PROD,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token, userId) => {
  if (token) {
    // Apply token and userId to headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["UserId"] = userId;
  } else {
    // Delete token and userId from headers
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["UserId"];
  }
};

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token && user?.userId) {
      // Set token and userId from local storage to headers
      config.headers.Authorization = `Bearer ${user.token}`;
      config.headers.UserId = user.userId;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ***************************************** USER APIS ******************************************************//

export const signupUser = async (form) => {
  try {
    const res = await axios.post(`/signup`, form);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`/login`, user);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// ***************************************** MATCHES APIS ******************************************************//

export const createMatch = async (formData) => {
  try {
    const res = await axios.post(`/create-match`, formData);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const fetchAllMatches = async () => {
  try {
    const res = await axios.get("/all-matches");
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(`/delete-match/${id}`);
    toast.success("Match deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getMatch = async (id) => {
  try {
    const res = await axios.get(`/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};
export const duplicateMatch = async (id) => {
  try {
    const res = await axios.post(`/duplicate/${id}`);
    if (res) {
      toast.success("Match duplicated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const updateMatch = async (id, formData) => {
  try {
    const res = await axios.put(`/match/${id}`, formData);
    if (res) {
      toast.success("Match updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// ***************************************** NEWS APIS ******************************************************//

export const createNews = async (data) => {
  try {
    const res = await axios.post(`/create/news`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const editNews = async (id, data) => {
  try {
    const res = await axios.put(`/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAllNews = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/all/news?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};
export const deleteSingleNews = async (id) => {
  try {
    const res = await axios.delete(`/delete-news/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getSingleNews = async (id) => {
  try {
    const res = await axios.get(`/news/${id}`);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// ************************************* MANAGE APP APIS ************************************************//

// *********** APP INFORMATION SECTION ************ //
export const createUpdateAppInformation = async (data) => {
  try {
    const res = await axios.post(`/set-app-information`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(`Settings updated!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return error;
  }
};
export const getAppInformation = async () => {
  try {
    const res = await axios.get(`/get-app-information`);
    return res.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return error;
  }
};

// *********** ANDROID SECTION ************ //
export const androidCreateUpdateSettings = async (data) => {
  try {
    const res = await axios.post(`/set-android-setting`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(`${res?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return error;
  }
};
export const getAndroidSettings = async () => {
  try {
    const settings = await axios.get("/get-android-setting");
    return settings;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};

// *********** iOS SECTION ************ //
export const iosCreateUpdateSettings = async (data) => {
  try {
    const res = await axios.post(`/set-ios-setting`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(`${res?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return error;
  }
};
export const getIosSettings = async () => {
  try {
    const settings = await axios.get("/get-ios-setting");
    return settings;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};
// *********** BLOCK COUNTRIES SECTION ************ //
export const getBlockedCountries = async () => {
  try {
    const blockedCountries = await axios.get("/get-block-countries");
    return blockedCountries.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};

export const CreateAndUpdateBlockedCountry = async (countries) => {
  try {
    const res = await axios.post(`/block-countries`, countries);
    toast.success(`Changes saved!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      theme: "light",
    });
    return error;
  }
};

export const deleteCountry = async (country) => {
  try {
    const del = await axios.delete(`/unblock-country/${country}`);
    toast.success(`Country unblocked!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    return err;
  }
};

// ***************************************** MOBILE VIEW APIS ******************************************************//

export const handleView = async (data) => {
  try {
    const res = await axios.post("/mobile-view", data);
    return res;
  } catch (err) {
    toast.error(`Error occured`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const fetchMobileView = async () => {
  try {
    const res = await axios.get("/get-view");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ***************************************** NOTIFICATION APIS ******************************************************//
export const createNotification = async (notification) => {
  try {
    const res = await axios.post(`/create-notification`, notification);
    toast.success(`Notification created successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAllNotifications = async () => {
  try {
    const notifications = await axios.get("/get-all-notifications");
    return notifications.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

export const deleteNotification = async (id) => {
  try {
    const del = await axios.delete(`/delete-notification/${id}`);
    toast.success(`Notification deleted successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

export const sendNotification = async (id) => {
  try {
    const notify = await axios.post(`/send-notification/${id}`);
    toast.success(`Notification sent successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return notify;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

// ***************************************** Ads APIs ******************************************************//
export const createUpdateAdSettings = async (settings) => {
  try {
    const res = await axios.post(`/google-ads-settings`, settings);
    toast.success(`Changes saved!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAdsSettings = async () => {
  try {
    const settings = await axios.get("/get-ads-settings");
    return settings.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};
