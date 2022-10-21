import { useState, useEffect, useRef } from 'react'
//import Blog from './components/Blog'
import Notification from './components/Notification'
import AddForm from './components/AddForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'
//import BlogWhole from './components/BlogWhole'

const App = () => {
  const [blogs, setBlogs] = useState([])
  /* const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') */
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState([null,'green'])
  //const [addVisible, setAddVisible] = useState(false)
  const AddBlogFormRef = useRef()
  const BlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      //const sortBlogs = blogs.sort((a, b) => a.likes - b.likes)
      setBlogs( sortBlogs(blogs) )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //sort blogs
  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  // in the page
  const showMessage =  (message,color) => {
    setErrorMessage(
      [message,color]
    )
    setTimeout(() => {
      setErrorMessage([null,''])
    }, 6000)
  }

  // Login
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage(`You logged in as '${user.username}' `,'green')
    } catch (exception) {
      showMessage(`Error! '${exception.response.data.error}'`,'red')
    }
  }

  //logout
  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem( 'loggedBlogAppUser' )
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
      showMessage(`'${user.username}' logged out`,'green')
    } catch (exception) {
      showMessage(`Error! '${exception.response.data.error}'`,'red')
    }
  }

  const loggedInForm = () => (
    <form onSubmit={handleLogout}>
      <p> {user.username} ({user.name}) logged-in <button type="submit">logout</button></p>
    </form>
  )

  // create new
  const addBlog = (blogObject) => {
    AddBlogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(sortBlogs(blogs.concat(returnedBlog)))
        showMessage(`a new blog '${blogObject.title}' by '${blogObject.author}' added`,'green')
      })
      .catch(response => {
        showMessage(response.response.data.error,'red')})
  }

  const addForm = () => (
    <Togglable buttonLabel='create new blog' buttonLabelEnd='cancel'  ref={AddBlogFormRef}>
      <AddForm createBlog={addBlog}/>
    </Togglable>
  )

  // blog view+hide
  const toggleViewOf = (blog) => {
    const togglepart = (
      <Togglable buttonLabel='view' buttonLabelEnd='hide' buttonUp={true} ref={BlogRef}>
        <Blog
          key={blog.id+'1'}
          blog={blog}
          togglepart={null}
          part={2}
          updateLikes={putNewLikes}
          user = {user}
          removeBlog={removeBlog}
        />
      </Togglable>
    )
    return(
      <Blog key={blog.id} blog={blog}
        togglepart={togglepart} part={1} updateBlog={null}/>
    )
  }

  const putNewLikes = (id,blogObject) => {
    blogService
      .update(id,blogObject)
      .then(returnedNote => {
        setBlogs(sortBlogs( blogs.map(blog => blog.id !== id ? blog : returnedNote)))
        showMessage(`Blog '${blogObject.title}' by '${blogObject.author}' has new amout of likes '${blogObject.likes}'`,'green')
      })
      .catch(response => {
        showMessage(response.response.data.error,'red')})
  }

  const removeBlog = (id,blogObject) => {
    if (window.confirm(`Do you really want to delete the blog '${blogObject.title}'?`)) {
      blogService
        .deleteFromDb(id)
        .then(() => {
          setBlogs(sortBlogs( blogs.filter(blog => blog.id !== id)))
          showMessage(`Blog '${blogObject.title}' by '${blogObject.author}' was deleted`,'green')
        })
        .catch(response => {
          showMessage(response.message,'red')})
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification message={errorMessage} />
          <Togglable buttonLabel='login' buttonLabelEnd='cancel'>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} />
          {loggedInForm()}
          {addForm()}
          {blogs.map(blog => toggleViewOf(blog))}

        </div>
      }
    </div>
  )
}

export default App
