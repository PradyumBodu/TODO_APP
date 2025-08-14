import { useState } from 'react'
import './App.css'
import Todo from './todo'
import Login from './Login'
import Ragister from './Ragister'
import {Routes,Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/ragister' element={<Ragister /> } />
        <Route path='/Todopage' element={<Todo/>} />
      </Routes>
    </>
  )
}

export default App
