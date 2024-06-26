import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./components/Home"
import { Toaster } from "react-hot-toast"
import User from "./components/User"
import ProtectRouter from "./components/ProtectRouter"
import Update from "./components/Update"

function App() {


  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route element={<ProtectRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </Router>
  )
}

export default App
