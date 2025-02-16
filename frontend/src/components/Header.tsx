import { Link } from "react-router";

const Header = () => {
  return (
    <div className="header">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernBooking.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link to='sign-in' 
          className='sign-in-btn'>
            Sign In
            </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
