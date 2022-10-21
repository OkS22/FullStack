import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('5.13 <Blog /> renders the blog\'s title and author', () => {
  test('renders the blog\'s title and author *GetByText', () => {
    const blog = {
      title: 'Very interesting theme',
      author: 'Name Surname'
    }
    render(<Blog blog={blog} part={1}/>)

    const element = screen.getByText('Very interesting theme', { exact: false })

    expect(element).toBeDefined()
    const element2 = screen.getByText('Name Surname', { exact: false })
    expect(element2).toBeDefined()
  })

  test('renders the blog\'s title and author *QuerySelector', () => {
    const blog = {
      title: 'Very interesting theme',
      author: 'Name Surname'
    }
    const { container } = render(<Blog blog={blog} part={1}/>)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Very interesting theme')
    expect(div).toHaveTextContent('Name Surname')
  })

})