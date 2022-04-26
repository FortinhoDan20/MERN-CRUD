import React from 'react'
import {BrowserRouter as  Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import About from "./pages/About"
import Home from "./pages/Home"
import AddEdit from "./pages/AddEdit"
import View from "./pages/View"
import Header from './components/Header'
import AddUser from './pages/AddUser'

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <ToastContainer/>
        <Routes>
          <Route path="/about" element={<About/> } />
          <Route path="/view/:id" element={<View />} />
          <Route path="/update-user/:id" element={<AddEdit/>} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path='/' element={<Home/> }/>

        </Routes>
      </div>
    </Router>
  )
}

export default App;
