import { StripePage } from "@src/pages/StripePage/StripePage";

import { StripeProvider } from "@src/contexts/StripeContext/StripeContext";

function App(): JSX.Element {
  return (
    <StripeProvider>
      <StripePage></StripePage>
    </StripeProvider>
  );
}

export default App;
