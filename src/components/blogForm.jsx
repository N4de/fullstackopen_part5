/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const BlogForm = ({
  title,
  author,
  url,
  onSubmit,
  blogFormVisible,
  setblogFormVisible,
}) => {
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' };
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' };


  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          type="button"
          onClick={() => setblogFormVisible(true)}
        >
          New blog
        </button>
      </div>

      <div style={showWhenVisible}>
        <div>
           title:
          <input
            {...title}
          />
        </div>

        <div>
          author:
          <input
            {...author}
          />
        </div>

        <div>
          url:
          <input
            {...url}
          />
        </div>

        <button
          type="submit"
          onClick={onSubmit}
        >
        create
        </button>

        <button
          type="button"
          onClick={() => setblogFormVisible(false)}
        >
          cancel
        </button>

      </div>
    </div>

  );
};


export default BlogForm;
