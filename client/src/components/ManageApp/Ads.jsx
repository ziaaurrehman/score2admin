const Ads = () => {
  return (
    <div className="w-full p-5">
      {/*ADS FORM*/}
      <form className="w-full flex flex-col gap-2">
        {/*Ads Status and Click Control*/}
        <div className="w-full flex gap-3">
          <div className="w-[50%]">
            <label className="text-xs font-bold">
              Ads Status <span className="text-red-600 font-bold">*</span>
            </label>
            <select
              className="border-2 border-gray-300 rounded-md py-[0.2rem] text-xs focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-[100%]"
              name="ads_status"
            >
              <option value="">Select One</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {/**/}
          <div className="w-[50%]">
            <label className="text-xs font-bold">
              Click Control <span className="text-red-600 font-bold">*</span>
            </label>
            <select
              className="border-2 border-gray-300 rounded-md py-[0.2rem] text-xs focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-[100%]"
              name="click_control"
            >
              <option value="">Select One</option>
              <option value="off">Off</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        {/*Google App ID and App Open Ads Code*/}
        <div className="w-full flex gap-3">
          <div className="w-[50%]">
            <label className="text-xs font-bold">Google App ID</label>
            <input
              type="text"
              name="google_app_id"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="Enter some value..."
            />
          </div>

          <div className="w-[50%]">
            <label className="text-xs font-bold">
              Google App Open Ads Code
            </label>
            <input
              type="text"
              name="google_app_ads_code"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="Enter some value..."
            />
          </div>
        </div>

        {/*Google Banner Ads & Google Interstitial Ads Code*/}
        <div className="w-full flex gap-3">
          <div className="w-[50%]">
            <label className="text-xs font-bold">Google Banner Ads Code</label>
            <input
              type="text"
              name="google_banner_ads_code"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="Enter some value..."
            />
          </div>

          <div className="w-[50%]">
            <label className="text-xs font-bold">
              Google Interstitial Ads Code
            </label>
            <input
              type="text"
              name="google_interstitial_ads_code"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="Enter some value..."
            />
          </div>
        </div>

        {/* Google Adaptive & Google Native Ads Code */}
        <div className="w-full flex gap-3">
          <div className="w-[50%]">
            <label className="text-xs font-bold">
              Google Adaptive Interstitial Ads Code
            </label>
            <input
              type="text"
              name="google_adaptive_interstitial_ads_code"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="Enter some value..."
            />
          </div>

          <div className="w-[50%]">
            <label className="text-xs font-bold">Google Native Ads Code</label>
            <input
              type="text"
              name="google_native_ads"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="Enter some value..."
            />
          </div>
        </div>

        {/* Google Rewarded Ads Code */}
        <div className="w-full">
          <div className="w-[100%]">
            <label className="text-xs font-bold">
              Google Rewarded Ads Code
            </label>
            <input
              type="text"
              name="google_rewarded_ads_code"
              className="border-2 block w-[100%] rounded-md border-gray-200 p-1 text-xs"
              placeholder="Enter some value..."
            />
          </div>
        </div>
      </form>

      <div className="w-full flex justify-end">
        <button className="text-sm my-4 font-semibold right-12 bottom-5 bg-blue-600 py-2 px-4 text-white uppercase hover:bg-blue-800 transition active:scale-95 rounded-md shadow-lg">
          Save
        </button>
      </div>
    </div>
  );
};

export default Ads;
