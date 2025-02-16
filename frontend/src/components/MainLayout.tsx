// here will lay the layout content in between header and footer


interface MainLayoutProps {
    children: React.ReactNode
  };

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <div className="container mx-auto py-10 flex-1 min-h-[85vh]">
      {children}
    </div>
  )
}

export default MainLayout