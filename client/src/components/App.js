import React from 'react';



// Components
import Toolbar from '../layout/Navigation/Toolbar/Toolbar'
import useLocalStorage from './Hooks/useLocalStorage';
import Login from './Login/Login';



function App() { 
  // STUB The key value is defined by id
  const [id,setId] = useLocalStorage('id')

  return (
    <>
      <Toolbar userId={id}/>

      {id}

      <Login onIdSubmit={setId}/>
    </>
  )
}


export default App;
