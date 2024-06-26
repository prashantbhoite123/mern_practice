import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
function Header() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold">MERN Auth</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to={"/user"}>
              <img
                src={currentUser.profilePic}
                alt=""
                className="w-6 h-6 rounded-full"
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <li>Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
