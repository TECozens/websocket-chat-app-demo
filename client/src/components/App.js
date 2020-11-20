import React from 'react';

// Components
import Toolbar from '../layout/Toolbar/Toolbar'
import {useLocalStorage} from 'react-use';
import Login from './Login/Login';
import Menu from '../layout/Menu/Menu.js'

function App() { 
  // STUB The key value is defined by id
  const [id,setId] = useLocalStorage('id')

  return (    
    <div>
      <Toolbar userId={id}/>
      {id ? <Menu id={id} /> : <Login onIdSubmit={setId} />}
    </div>
    
  );
  
}


export default App;
