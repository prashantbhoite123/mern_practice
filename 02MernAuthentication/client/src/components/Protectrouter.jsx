import React from "react"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Protectrouter() {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />
}

export default Protectrouter
