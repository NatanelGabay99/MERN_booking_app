

const Footer = () => {
  return (
    <div className="footer">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-yellow-500 font-bold tracking-tight">MernBooking.com</span>
            <span className=" text-white font-bold tracking-tight flex gap-4">
                <p className="cursor-pointer">Privacy Policy</p>
                <p className="cursor-pointer">Terms of Service</p>
            </span>
        </div>
    </div>
  )
}

export default Footer