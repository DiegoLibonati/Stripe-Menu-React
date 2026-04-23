import type { JSX } from "react";

import StripeNavPage from "@/pages/StripeNavPage/StripeNavPage";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

function App(): JSX.Element {
  return (
    <StripeProvider>
      <StripeNavPage></StripeNavPage>
    </StripeProvider>
  );
}

export default App;
