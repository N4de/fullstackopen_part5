import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
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
