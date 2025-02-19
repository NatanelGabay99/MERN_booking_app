import { Link, useNavigate } from "react-router";
import { useAppContext } from "../../contexts/AppContext";
import LogoutButton from "../Buttons/LogoutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-yellow-500 font-bold tracking-tight">
          <Link to="/">MernBooking.com</Link>
        </span>
        <span className="flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="text-white font-semibold">My Bookings</Link>
              <Link to="/my-hotels" className="text-white font-semibold">My Hotels</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <button className="register-btn" onClick={() => navigate("/register")}>
                Sign Up
              </button>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
              </button>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
