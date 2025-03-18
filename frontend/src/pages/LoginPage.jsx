import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore.js'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoggingIn } = useAuthStore()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      email: email,
      password: password
    }
    try {
      await login(data)
      toast.success('Login successful')
    } catch (error) {
      setError(error.response.data.message)
      toast.error('Login failed')
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold mb-10'>Login</h1>
        <form className='flex flex-col gap-4 w-full max-w-sm px-4' onSubmit={handleSubmit}>
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-gray-300 rounded-md p-2 w-full' />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-gray-300 rounded-md p-2 w-full' />
            <button type='submit' disabled={loading} className='bg-primary text-white p-2 rounded-md'>Login</button>
            {error && <p className='text-red-500'>{error}</p>}
            {isLoggingIn && <p className='text-blue-500'>Logging in...</p>}
            {loading && <p className='text-blue-500'>Loading...</p>}
            <Link to='/signup' className='text-sm text-gray-500'>Don't have an account? <span className='text-primary'>Register</span></Link>
        </form>
        <Toaster />
    </div>  
  )
}

export default LoginPage;
