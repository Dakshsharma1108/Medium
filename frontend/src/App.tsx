import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import { Blog } from './Pages/Blog'
import { Blogs } from './Pages/Blogs'
import { CreateBlog } from './Pages/CreateBlog'
import { Home } from './Pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/blog/new' element={<CreateBlog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App