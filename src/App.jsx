import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Mycomponents/Signin'
import Signup from './Mycomponents/Signup'
import Todo from './Mycomponents/Todo'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/todo' element={<Todo />}></Route>
      </Routes>
    </Router>
      {/* <Signup />
      <Signin />
      <Todo /> */}
    </>
  )
}

export default App
