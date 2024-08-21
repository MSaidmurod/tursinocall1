import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
//layout
import MainLayout from "./layout/MainLayout";
// components pages
import Home from "./pages/Home";
import AdminPg from "./pages/AdminPg";
import AdminlarBoshqaruvi from "./pages/AdminlarBoshqaruvi";
import Hodimlar from "./pages/Hodimlar";
import Mijozlar from "./pages/Mijozlar";
import Biriktirilgan from "./pages/Biriktirilgan";

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/adminpanel" element={<AdminPg />} />
        <Route path="/admincontrol" element={<AdminlarBoshqaruvi />} />
        <Route path="/employees/:id" element={<Hodimlar />} />
        <Route path="/customers/:id" element={<Mijozlar />} />
        <Route path="/attached/:id" element={<Biriktirilgan />} />
      </Route>
    )
  );

  return <RouterProvider router={routes} />;
}

export default App;
