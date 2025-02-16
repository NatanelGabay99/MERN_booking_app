import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"
import MainLayout from "../components/MainLayout"

interface MainLayoutProps {
  children: React.ReactNode
};


const Layout = ({children}: MainLayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <Hero />
        <MainLayout>{children}</MainLayout>
        <Footer />
    </div>
  )
}

export default Layout