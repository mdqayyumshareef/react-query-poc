import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/Main";
import Profile from "./pages/Profile";
import Timezone from "./pages/Timezone";
import WebSocket from "./pages/WebSocket";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 1000, // 2 minutes
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/profiles" element={<Profile />} />
            <Route path="/timezone" element={<Timezone />} />
            <Route path="/websocket" element={<WebSocket />} />
            <Route path="/" element={<Navigate to={"/profiles"} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
