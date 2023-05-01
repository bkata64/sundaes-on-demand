import { createContext, useContext } from "react";

const OrderDetails = createContext();

// create custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const value = {};
  return <OrderDetails.Provider value={value} {...props} />;
}
