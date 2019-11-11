import React from 'react';

const BlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
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
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
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
