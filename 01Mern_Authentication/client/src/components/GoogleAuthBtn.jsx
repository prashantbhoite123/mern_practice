import React from "react"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { fetchStart, fetchEnd, fetchSuccess } from "../App/User/UserSlice"
import { app } from "../firebase"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const GoogleAuthBtn = () => {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handelClick = async () => {
    try {
      dispatch(fetchStart())
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user)
      console.log(result)
      const res = await fetch("/api/user/googleauth", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        }),
      })
      const data = await res.json()
      console.log(data.profilePic)
      if (data.success === false) {
        toast.error(data.message)
        dispatch(fetchEnd())
        return
      }
      dispatch(fetchSuccess(data))
      toast.success(`Welcome ${data.name}`)
      navigate("/")
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div>
      <button
        disabled={loading}
        onClick={handelClick}
        type="submit"
        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-red-400 disabled:cursor-not-allowed"
      >
        {loading ? `LOADING...` : `continue with google`}
      </button>
    </div>
  )
}

export default GoogleAuthBtn
