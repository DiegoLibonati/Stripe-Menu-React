import StripePage from "@/pages/StripePage/StripePage";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

function App() {
  return (
    <StripeProvider>
      <StripePage></StripePage>
    </StripeProvider>
  );
}

export default App;
