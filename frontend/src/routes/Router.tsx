import { Navigate, Route, Routes } from "react-router-dom";
import ROUTES from "./routes.model";
import MainLayout from "../components/MainLayout/MainLayout";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout><p>Home Page</p></MainLayout>} />
      <Route path={ROUTES.SEARCH} element={<MainLayout><p>Search Page</p></MainLayout>} />
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MY_BOOKINGS} element={''}></Route>
      <Route path={ROUTES.MY_HOTELS} element={''}></Route>
    </Routes>
  );
};

export default Router;
