import React, { useState, useEffect } from 'react';

import loginService from './services/login';
import blogService from './services/blogs';
import BlogForm from './components/blogForm';
import LoginForm from './components/loginForm';
import { useField } from './hooks';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogFormVisible, setblogFormVisible] = useState(false);
  const username = useField('text');
  const password = useField('password');
  const title = useField('text');
  const author = useField('text');
  const url = useField('url');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(parsedUser.token);
      setUser(parsedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(e);
    const userBody = {
      username: username.value,
      password: password.value,
    };

    try {
      const loggedUser = await loginService.login(userBody);
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser),
      );
      username.reset();
      password.reset();
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      console.log(loggedUser);
    } catch (exception) {
      console.error(exception);
    }
  };

  const handleLogout = () => {
    setUser('');
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault(e);
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      const createdBlog = await blogService.createBlog(newBlog);
      console.log(createdBlog);
      url.reset();
      author.reset();
      title.reset();
    } catch (err) {
      console.error(err);
    }
  };

  if (user) {
    return (
      <div>
        <h1>Blogs</h1>
        <span>
          {user.name}
          logged in
          <button
            type="button"
            onClick={handleLogout}
          >
            logout
          </button>
        </span>
        <BlogForm
          title={title}
          author={author}
          url={url}
          onSubmit={handleBlogSubmit}
          blogFormVisible={blogFormVisible}
          setblogFormVisible={setblogFormVisible}
        />

        {user.blogs.map((blog) => (
          <p key={blog.title}>
            {blog.title}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <LoginForm
        handleSubmit={handleLogin}
        username={username}
        password={password}
      />
    </div>

  );
};
export default App;
