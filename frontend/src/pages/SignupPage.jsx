import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Mail, MessageSquare, User, Lock, Eye, EyeOff, Loader2} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const { signup,isSigningUp } = useAuthStore()


  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email address')
      return false
    }
    if (!formData.password.trim()) {
      toast.error('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = validateForm()
    if(success === true) signup(formData);
  };
  
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 lg:col-span-2">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className="text-2xl font-bold mt-2">
                Create an account
              </h1>
              <div className="text-base-content/60">
                Sign up to your account to continue
              </div>
            </div>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            
              <div className='form-control'>
                <label htmlFor='fullName' className='label'>
                  <span className='label-text font-medium'>Full Name</span>
                </label>
                <div className='relative'>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className='size-5 text-primary' />
                  </div>
                <input type='text' 
                id='fullName' 
                placeholder='Full Name' 
                className='input input-bordered w-full pl-10' 
                value={formData.fullName} 
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
               </div>
              </div>
              <div className='form-control'>
                <label htmlFor='email' className='label'>
                  <span className='label-text font-medium'>Email</span>
                </label>
                <div className='relative'>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className='size-5 text-primary' />
                  </div>
                  <input type='email' 
                  id='email' 
                  placeholder='Email' 
                  className='input input-bordered w-full pl-10' 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div className='form-control'>
                <label htmlFor='password' className='label'>
                  <span className='label-text font-medium'>Password</span>
                </label>
                <div className='relative'>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className='size-5 text-primary' />
                  </div>
                  <input type={showPassword ? 'text' : 'password'} 
                  id='password' 
                  placeholder='Password' 
                  className='input input-bordered w-full pl-10' 
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye className='size-5 text-primary' /> : <EyeOff className='size-5 text-primary' />}
                  </button>
                </div>
              </div>  
              <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                {isSigningUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin' />
                    Signing up...
                  </>
                ) : (
                  'Create account'
                )}
              </button>
          </form>
          <div className='text-center'>
            <Link to='/login' className='text-sm text-base-content/60'>Already have an account? <span className='text-primary'>Login</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
