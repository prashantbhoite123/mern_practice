import React from "react"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchStart, fetchEnd, fetchSuccess } from "../App/Feature/UserSlice"
function GoogleBtn() {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch(fetchStart())
    try {
      const Provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, Provider)
      const user = result.user
      console.log(result)
      const res = await fetch("/api/user/google-auth", {
        method: "POST",
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
      if (data.success === false) {
        toast.error(data.error)
        dispatch(fetchEnd())
        return
      }
      dispatch(fetchSuccess(data))
      toast.success(`WellCome ${data.name}`)
      navigate("/")
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <div>
      <button
        disabled={loading}
        onClick={handleClick}
        type="submit"
        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {loading ? `LOADING...` : `Continue with Gooogle`}
      </button>
    </div>
  )
}

export default GoogleBtn
