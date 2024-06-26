import React from "react"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"
import { toast } from "react-hot-toast"
function GoogleBtn() {
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const Provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, Provider)
      console.log(result)
      const res = await fetch("/api/user/google-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
    } catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <div>
      <button
        // disabled={loading}
        onClick={handleClick}
        type="submit"
        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {/* {loading ? `LOADING...` : `SIGN UP`} */}
        Continue with Gooogle
      </button>
    </div>
  )
}

export default GoogleBtn
