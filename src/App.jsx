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
      username: username.form.value,
      password: password.form.value,
    };

    try {
      const loggedUser = await loginService.login(userBody);
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser),
      );
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
      title: title.form.value,
      author: author.form.value,
      url: url.form.value,
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
          title={title.form}
          author={author.form}
          url={url.form}
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
        username={username.form}
        password={password.form}
      />
    </div>

  );
};
export default App;
