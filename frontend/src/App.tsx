import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Blog } from './Pages/Blog'
import { Blogs } from './Pages/Blogs'
import { CreateBlog } from './Pages/CreateBlog'
import { Home } from './Pages/Home'
import { ProtectedRoute } from './Components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home/>}/>
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
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App