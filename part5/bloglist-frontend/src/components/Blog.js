const Blog = ({ blog, togglepart, part, updateLikes, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonRemoveStyle = {
    paddingLeft: 5,
    color: 'blue',
    marginBottom: 5,
    marginLeft: 5
  }
  const likeStyle = {
    paddingLeft: 5,
    color: 'red',
    marginBottom: 5,
    marginLeft: 5
  }

  const increaseLikes = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user
    }
    updateLikes (blog.id,newBlog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog (blog.id,blog)
  }

  if (part===1) {
    return (
      <div style={blogStyle} className='blog'>
        {blog.title} {blog.author}
        {togglepart}
      </div>
    )
  } else {
    return (
      <div>
        {blog.url}<br/>
        likes {blog.likes}
        <button id='like-button' style={likeStyle} onClick={increaseLikes}>like</button> <br/>
        {blog.user.username}-{blog.user.name} <br/>
        {(user.id === blog.user.id) ?
          <div>
            <button id='delete-button' style={buttonRemoveStyle} onClick={deleteBlog}>remove</button>
          </div>:
          <div>
          (no right for removing)
          </div>
        }

      </div>
    )
  }
}

export default Blog