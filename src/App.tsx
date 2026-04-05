import type { JSX } from "react";

import StripePage from "@/pages/StripePage/StripePage";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

function App(): JSX.Element {
  return (
    <StripeProvider>
      <StripePage></StripePage>
    </StripeProvider>
  );
}

export default App;
