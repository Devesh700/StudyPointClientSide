import React, { createContext, useContext, useState } from "react";
// import ReactAlert from "../components/utils/ReactAlert";  // Your alert component
import ReactAlert from "./ReactAlert";

// Create AlertContext
const AlertContext = createContext();  // Ensure that this is defined properly

// AlertProvider to wrap your app
export const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState({
    type: "Alert",
    message: "",
    visible: false,
  });

  const showAlert = (type, message) => {
    setAlertData({ type, message, visible: true });

    // Automatically hide after 3 seconds
    setTimeout(() => {
      setAlertData((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      {alertData.visible && (
        <ReactAlert type={alertData.type} message={alertData.message} />
      )}
    </AlertContext.Provider>
  );
};

// Custom hook to access alert
export const useAlert = () => {
  const context = useContext(AlertContext);  // Ensure that this uses the context
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
