import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddForm from './AddForm'
import userEvent from '@testing-library/user-event'

describe('5.16 <AddForm /> test for the new blog form', () => {
  test('<AddForm /> test checks textboxes and calls onSubmit', async () => {
    const addBlog = jest.fn()
    const user = userEvent.setup()

    render(<AddForm createBlog={addBlog}/>)

    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'title first...')
    await user.type(inputs[1], 'author second...')
    await user.type(inputs[2], 'url third...')
    await user.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('title first...')
    expect(addBlog.mock.calls[0][0].author).toBe('author second...')
    expect(addBlog.mock.calls[0][0].url).toBe('url third...')
  })

  test('<AddForm /> test checks textboxes and calls onSubmit *Placeholder', async () => {
    const addBlog = jest.fn()

    render(<AddForm createBlog={addBlog}/>)

    //should stick this
    const inputs = []
    inputs[0] = screen.getByPlaceholderText('write title here')
    inputs[1] = screen.getByPlaceholderText('write author here')
    inputs[2] = screen.getByPlaceholderText('put url here')
    const sendButton = screen.getByText('create')

    await userEvent.type(inputs[0], 'title first')
    await userEvent.type(inputs[1], 'author second')
    await userEvent.type(inputs[2], 'url third')
    await userEvent.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('title first')
    expect(addBlog.mock.calls[0][0].author).toBe('author second')
    expect(addBlog.mock.calls[0][0].url).toBe('url third')
  })

  test('<AddForm /> test checks textboxes and calls onSubmit *ID', async () => {
    const addBlog = jest.fn()

    const { container } = render(<AddForm createBlog={addBlog}/>)

    const inputs = []
    inputs[0] = container.querySelector('#title-input')
    inputs[1] = container.querySelector('#author-input')
    inputs[2] = container.querySelector('#url-input')
    const sendButton = screen.getByText('create')

    await userEvent.type(inputs[0], 'title first1')
    await userEvent.type(inputs[1], 'author second2')
    await userEvent.type(inputs[2], 'url third3')
    await userEvent.click(sendButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('title first1')
    expect(addBlog.mock.calls[0][0].author).toBe('author second2')
    expect(addBlog.mock.calls[0][0].url).toBe('url third3')
  })
})