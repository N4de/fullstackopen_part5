import React, { useState, useEffect } from 'react';

import loginService from './services/login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
      username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>

    </div>

  );
};
export default App;
