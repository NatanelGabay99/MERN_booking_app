import { Link } from "react-router";
import { useAppContext } from "../../contexts/AppContext";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  
  return (
    <div className="header">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernBooking.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <button className="sign-out-btn">Sign out</button>
            </>
          ) : (
            <Link to="sign-in" className="sign-in-btn">
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
