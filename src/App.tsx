import Dashboard from "@pages/Dashboard/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Manage from "@pages/Manage/Manage";
import Books from "@pages/Books/Books";
import New from "@pages/New/New";
import { NotFound } from "@pages/NotFound/NotFound";
import Login from "@pages/Login/Login";
import Book from "@pages/Book/Book";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage" element={<Manage />} />
          <Route path="books" element={<Books />} />
          <Route path="book/:bookId" element={<Book />} />
          <Route path="new" element={<New />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
