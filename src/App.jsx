import React, { useState } from 'react';

import loginService from './services/login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(e);
    const userBody = {
      username,
      password,
    };

    try {
      const loggedUser = await loginService.login(userBody);
      setUser(loggedUser);
      console.log(loggedUser);
    } catch (exception) {
      console.error(exception);
    }
  };

  if (user) {
    return (
      <div>
        <h1>Blogs</h1>
        <p>
          {user.name}
          logged in
        </p>
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
