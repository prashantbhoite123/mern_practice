import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logoutUser } from "../App/User/UserSlice"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Update from "./Update"

function User() {
  const Dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      console.log(`Button clicked`)
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      Dispatch(logoutUser())
      window.location.reload()
    } catch (e) {
      toast.error(e.message)
    }
  }
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout")
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        throw new Error(data.message)
      }
      toast.success(data.message)
      Dispatch(logoutUser())
      window.location.reload()
    } catch (e) {
      toast.error(e.message)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    console.log("botton was clicked")
    return navigate("/update")
  }
  return (
    <>
      {/* <div className="flex justify-center items-center ">
        <form>
          <div className="w-6 h-6 rounded-full">
            <img src={currentUser.profilePic} alt="" />
          </div>
          <input type="text" readOnly defaultValue={currentUser.name} />
          <div className="my-5">
            <input type="text" readOnly defaultValue={currentUser.email} />
          </div>
        </form>
      </div> */}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto rounded-full"
            src={currentUser.profilePic}
            alt="Your Company"
            title="logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
            Profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <div className="mt-2"></div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  name="name"
                  type="text"
                  defaultValue={currentUser.name}
                  readOnly
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  defaultValue={currentUser.email}
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleClick}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                Update Profile
              </button>

              <div className="flex justify-between my-2">
                <button
                  type="button"
                  className="text-red-600 font-bold text-xl"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="text-blue-600 font-bold text-xl"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <hr />
          </form>
        </div>
      </div>
    </>
  )
}

export default User
