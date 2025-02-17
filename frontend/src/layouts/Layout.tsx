import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import MainLayout from "../components/MainLayout/MainLayout"

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