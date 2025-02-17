import { BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Router from "./routes/Router";
import { AppContextProvider } from "./contexts/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0
      },
    },
  });
  return (
    <BrowserRouter>
     <QueryClientProvider client={queryClient}>
      <AppContextProvider>
      <Layout>
        <Router />
      </Layout>
      </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
