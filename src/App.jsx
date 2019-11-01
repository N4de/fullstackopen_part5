import React, { useState, useEffect } from 'react';

import loginService from './services/login';
import blogService from './services/blogs';
import BlogForm from './components/blogForm';
import LoginForm from './components/loginForm';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [blogFormVisible, setblogFormVisible] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      setUser(parsedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(e);
    const userBody = {
      username,
      password,
    };

    try {
      const loggedUser = await loginService.login(userBody);
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser),
      );
      setUser(loggedUser);
      setUsername('');
      setPassword('');
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
      title,
      author,
      url,
    };

    try {
      const createdBlog = await blogService.createBlog(newBlog);
      console.log(createdBlog);
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
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
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
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </div>

  );
};
export default App;
