import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SimpleBlog from './simpleBlog';

afterEach(cleanup);

test('renders content', () => {
  const blog = {
    title: 'blogTitle',
    author: 'blogAuthor',
    likes: 3,
  };

  const component = render(
    <SimpleBlog
      blog={blog}
    />,
  );

  component.debug();

  expect(component.container).toHaveTextContent(
    'blogTitle',
  );
  expect(component.container).toHaveTextContent(
    'blogAuthor',
  );
  expect(component.container).toHaveTextContent(
    'blog has3likes',
  );
});

test('button is functional', () => {
  const blog = {
    title: 'blogTitle',
    author: 'blogAuthor',
    likes: 3,
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />,
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
