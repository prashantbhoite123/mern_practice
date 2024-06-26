import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Headers from "./components/Headers"
import Home from "./components/Home"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp"
import Protectrouter from "./components/Protectrouter"
import Profile from "./components/Profile"
function App() {
  return (
    <>
      <Router>
        <Headers />
        <Routes>
          <Route element={<Protectrouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
