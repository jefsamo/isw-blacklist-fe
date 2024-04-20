import Dashboard from "@pages/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Manage from "@pages/Manage/Manage";
import Items from "@pages/Items/Items";
import Users from "@pages/Users/Users";
import { NotFound } from "@pages/NotFound/NotFound";
import Login from "@pages/Login/Login";
import Item from "@pages/Item/Item";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import User from "@pages/User/User";
import CreateUser from "@pages/CreateUser/CreateUser";
import Blacklist from "@pages/Blacklist/Blacklist";
import CreateItem from "@pages/CreateItem/CreateItem";
import CreateblacklistItem from "@pages/CreateblacklistItem/CreateblacklistItem";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blacklist" element={<Manage />} />
            <Route path="blacklist/:blacklistItemId" element={<Blacklist />} />
            <Route path="items" element={<Items />} />
            <Route path="item/:itemId" element={<Item />} />
            <Route path="users" element={<Users />} />
            <Route path="user/:userId" element={<User />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="create-item" element={<CreateItem />} />
            <Route path="create-blacklist-item" element={<CreateblacklistItem />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
