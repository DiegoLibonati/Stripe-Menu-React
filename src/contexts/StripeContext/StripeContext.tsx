import { createContext } from "react";

import type { StripeContext as StripeContextT } from "@/types/contexts";

export const StripeContext = createContext<StripeContextT | null>(null);
