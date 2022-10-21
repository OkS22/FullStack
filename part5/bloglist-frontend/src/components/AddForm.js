import { useState } from 'react'

const AddForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title
        <input
          type='text'
          value={title}
          name='Title'
          onChange={handleTitleChange}
          placeholder='write title here'
          id='title-input'
        />
      </div>
      <div>
      author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          placeholder='write author here'
          id='author-input'
        />
      </div>
      <div>
      url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
          placeholder='put url here'
          id='url-input'
        />
      </div>
      <button id='create-button' type="submit">create</button>
    </form>
  )}

export default AddForm