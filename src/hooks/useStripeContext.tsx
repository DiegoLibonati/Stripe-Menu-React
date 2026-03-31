import { useContext } from "react";

import { UseStripeContext } from "@/types/hooks";

import { StripeContext } from "@/contexts/StripeContext/StripeContext";

export const useStripeContext = (): UseStripeContext => {
  const context = useContext(StripeContext);
  if (!context) throw new Error("useStripeContext must be used within StripeProvider");
  return context;
};
