    
    interface AuthLayoutProps{
        children:React.ReactNode
    }
    
    const AuthLayout=({children}:AuthLayoutProps)=>{
        return(
            // <div className="bg-gray-100 h-screen">
            // {children}
            // </div>
              <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-600">MYLZ</h1>
          </div>
          {children}
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/lovable-uploads/f72e0944-184a-4148-9159-776b39426494.png"
          alt="Soccer player with ball"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
      </div>
    </div>
        );
    }

    export default AuthLayout;