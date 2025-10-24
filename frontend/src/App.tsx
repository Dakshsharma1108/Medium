import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Blog } from './Pages/Blog'
import { Blogs } from './Pages/Blogs'
import { CreateBlog } from './Pages/CreateBlog'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { SmartHomeRoute } from './Components/SmartHomeRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Smart Home Route - redirects to /blogs if authenticated */}
          <Route path='/' element={<SmartHomeRoute />} />
          
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          {/* Protected Routes */}
          <Route path="/blog/:id" element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          } />
          <Route path='/blogs' element={
            <ProtectedRoute>
              <Blogs/>
            </ProtectedRoute>
          }/>
          <Route path='/blog/new' element={
            <ProtectedRoute>
              <CreateBlog/>
            </ProtectedRoute>
          }/>
          
          {/* Catch all route - redirect to smart home */}
          <Route path="*" element={<SmartHomeRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App