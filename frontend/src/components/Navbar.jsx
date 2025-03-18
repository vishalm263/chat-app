import React from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Settings, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const { authUser, logout } = useAuthStore()
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="w-9 h-9 rounded-lg bg-primary flex justify-center items-center">
              <MessageSquare className="w-6 h-6 text-white"/>
            </div>
            <h1 className="text-xl font-bold">
              <span className="text-primary">Chat</span>
              <span className="text-base-content">App</span>
            </h1>
            </Link>
          </div>
          
          <div className='flex items-center gap-2'>
            <div className="flex items-center gap-2">
            <Settings className='w-5 h-5 text-primary' />
            <span className='hidden sm:block font-semibold pr-1'>Settings</span>
            </div>
            {authUser ? (
              <>
              <Link to={`/profile/${authUser._id}`} className='btn btn-sm gap-2'>
              <User className='size-5 text-primary' />
              <span className='hidden sm:inline'>Profile</span>
            </Link>
            <button onClick={logout} className="flex items-center gap-2">
              <LogOut className='size-5 text-primary' />
              <span className='hidden sm:inline'>Logout</span>
            </button>
            </>
            ) : (
              <Link to="/login" className="btn btn-primary">Login</Link>
            )}
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
