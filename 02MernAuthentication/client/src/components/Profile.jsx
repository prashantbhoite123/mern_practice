import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { fetchEnd, logoutUser, updateSuccess } from "../App/Feature/UserSlice"
import { useDispatch, useSelector } from "react-redux"
function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser, loading } = useSelector((state) => state.user)
  const [istodoEditable, setistodoEdatable] = useState(false)
  const [fromData, setFromData] = useState(null)
  console.log(fromData)
  // console.log("This is a currentUser", currentUser)

  const handleDelete = async () => {
    console.log("button clicked")
    try {
      console.log(currentUser._id)
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.message === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      dispatch(logoutUser())
      window.location.reload()
    } catch (e) {
      toast.error(e.message)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout")
      const data = await res.json()
      if (data.message === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      dispatch(logoutUser())
      window.location.reload()
    } catch (e) {
      toast.error(e.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(fromData),
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        return
      }

      console.log(data)
      dispatch(updateSuccess(data.rest))
      toast.success(data.message)
      navigate("/")
    } catch (e) {
      toast.error(e.error)
    }
  }

  const handleChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value })
  }
  return (
    <>
      {istodoEditable ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-12 w-auto"
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
                    onChange={handleChange}
                    defaultValue={currentUser.name}
                    // onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    defaultValue={currentUser.email}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={loading}
                  onClick={handleUpdate}
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {loading ? `LOADING...` : `Save`}
                </button>
              </div>
              <div>
                <button
                  disabled={loading}
                  onClick={() => setistodoEdatable(false)}
                  type="button"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
              <hr />
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              New member?{" "}
              <Link
                to="/sign-up"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                sign Up
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-12 w-auto"
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
                    id="email"
                    defaultValue={currentUser.name}
                    readOnly
                    // onChange={handleChange}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    readOnly
                    defaultValue={currentUser.email}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  disabled={loading}
                  onClick={() => setistodoEdatable(true)}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {/* {loading ? `LOADING...` : `Update User`} */}
                  Update
                </button>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-red-600 font-bold text-xl"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="text-blue-600 font-bold text-xl"
                >
                  Logout
                </button>
              </div>
              <hr />
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              New member?{" "}
              <Link
                to="/sign-up"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
