import React, { useContext } from "react";

  type ToastMessage = {
    message: string;
    type: "success" | "error";
  };

export type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return (
    <AppContext.Provider value={{showToast: (toastMessage) => {console.log(toastMessage)}}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within a AppContextProvider");
  return context as AppContext;
};
