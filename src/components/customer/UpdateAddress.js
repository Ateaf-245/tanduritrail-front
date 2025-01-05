import React, { useState } from "react";
import Select from "react-select";
import addressData from "../../assets/addressData.json";
import BgImage from "../../assets/bannersList/banner_4.png";
import { updateAddresService } from "../../services/userService";
import { AlertModal } from "../Model";

export default function UpdateAddress() {
  const [alertModal, setAlertModal] = useState(false); // Modal visibility state
  const [alertMessage, setAlertMessage] = useState(""); // Modal message
  const [alertTitle, setAlertTitle] = useState(""); // Modal title
  const [navigateTo, setNavigateTo] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const stateOptions = Object.keys(addressData).map((s) => ({
    value: s,
    label: s,
  }));

  const cityOptions = state
    ? Object.keys(addressData[state.value]).map((c) => ({ value: c, label: c }))
    : [];

  const pincodeOptions = city
    ? addressData[state.value][city.value].map((pincode) => ({
        value: pincode,
        label: pincode,
      }))
    : [];

  const handleAddressUpdate = async (e) => {
    e.preventDefault();

    if (!state) {
      setError("Please select state");
      return;
    }
    if (!city) {
      setError("Please select city");
      return;
    }
    if (!zip) {
      setError("Please select pincode");
      return;
    }

    if (!street) {
      setError("Please provide street details");
      return;
    }

    const address = {
      street,
      state: state.value,
      city: city.value,
      zip: zip.value,
    };
    // need to complete
    try {
      await updateAddresService(address);
      setAlertMessage("this is for testing");
      setAlertTitle("testing");
      setAlertModal(true);
      setNavigateTo("/home")
    } catch (error) {
      console.error("Registration Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] relative">
      <div
        className=" lg:absolute fixed inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: `url(${BgImage})` }}
      ></div>
      <div className="relative z-10 ml-2 sm:mt-3 mt:36 mr-2 w-full lg:max-w-xl max-w-md lg:p-8 px-8 pb-4 bg-white rounded-lg shadow-lg">
        <h1 className=" lg:text-2xl font-extrabold text-center text-gray-800 lg:mb-4 mb-3 mt-2">
          Update Address Details
        </h1>
        <p className="sm:text-sm text-xs text-center mb-4 text-gray-600 ">
          please update yout address details to proceed further.
        </p>

        {error && (
          <div className="mb-1 text-sm bg-red-100 p-1 rounded text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleAddressUpdate}>
          <div className="sm:grid sm:grid-cols-2 sm:gap-2">
            <div className="mb-3">
              <label className="block text-gray-700 font-medium lg:text-base text-sm mb-1">
                State :
              </label>
              <Select
                className="text-black max-w-27"
                options={stateOptions}
                placeholder="Select State"
                value={state}
                onChange={(e) => {
                  setState(e);
                  setCity(null);
                  setZip(null);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium lg:text-base text-sm mb-1">
                City :
              </label>
              <Select
                className="text-black max-w-27"
                options={cityOptions}
                placeholder="Select City"
                value={city}
                onChange={(e) => {
                  setCity(e);
                  setZip(null);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium lg:text-base text-sm mb-1">
                Pin Code :
              </label>
              <Select
                className="text-black max-w-27"
                options={pincodeOptions}
                placeholder="Select pincode"
                value={zip}
                onChange={(e) => setZip(e)}
              />
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="street"
                className="block  text-gray-700 font-medium lg:text-base text-sm mb-1"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-white text-black px-4 py-2 border border-gray-300 rounded-l focus:outline-none lg:text-base text-sm focus:ring-blue-500 focus:border-blue-600"
              ></input>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 lg:text-base text-sm text-white font-bold  mt-4 py-2 px-4 rounded-xl focus:ring-orange-300 focus:outline-none hover:bg-orange-600 transition duration-300"
          >
            Update
          </button>
        </form>

        <AlertModal
          isOpen={alertModal}
          onClose={() => setAlertModal(false)}
          title={alertTitle}
          message={alertMessage}
          buttonLabel="Got it!"
          navigateTo={navigateTo}
        />
      </div>
    </div>
  );
}
