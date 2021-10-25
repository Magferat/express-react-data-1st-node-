import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const nameRef = useRef()
  const emailRef = useRef()

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e => {
    e.preventDefault()
    console.log(nameRef.current.value)
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }


    // send data to server 

    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(newUser)


    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data;
        const newUser = [...users, addedUser];
        setUsers(newUser)

      })
    nameRef.current.value = '';
    emailRef.current.value = '';

  }

  return (
    <div className="App">
      <h1>Users : {users.length}</h1>
      <form onSubmit={handleAddUser}  >
        <input ref={nameRef} type="text" placeholder='name' />
        <input ref={emailRef} type='email' placeholder='email' />
        <input type="submit" placeholder='submit' />

      </form>


      <ul>{
        users.map(user => <li
          key={user.id}
        >
          {user.id}.  {user.name} {user.phone} {user.email}
        </li>)
      } </ul>
    </div>
  );
}

export default App;
