import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import Blog from './Blog'

describe('Blog list test - part 5c', () => {
  let container
  const clickLikes = jest.fn()

  const user = {
    id: '11',
    username: 'root',
    name: 'SuperUser',
    password: 'salasana',
  }

  const blog = {
    title: 'Very interesting theme',
    author: 'Name Surname',
    likes: 11,
    url: 'my.io',
    id: '00',
    user: user
  }

  const toggleViewOf = (blog,putNewLikes) => {
    const togglepart = (
      <Togglable buttonLabel='view' buttonLabelEnd='hide' buttonUp={true} ref={null}>
        <Blog
          key={blog.id+'1'}
          blog={blog}
          togglepart={null}
          part={2}
          updateLikes={putNewLikes}
          user = {user}
          removeBlog={null}
        />
      </Togglable>
    )
    return(
      <Blog key={blog.id} blog={blog}
        togglepart={togglepart} part={1} updateBlog={null}/>
    )
  }

  beforeEach(() => {
    container = render(
      toggleViewOf(blog,clickLikes)
    ).container
  })

  test('5.14 url and number of likes are shown when the button has been clicked', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('my.io')
    expect(div).toHaveTextContent('11')
  })

  test('5.15 Like button is clicked twice', async () => {
    const user = userEvent.setup()

    const sendButton = screen.getByText('like')

    await user.click(sendButton)
    await user.click(sendButton)
    expect(clickLikes.mock.calls).toHaveLength(2)
  })

})