import React, { useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateSuccess } from "../App/User/UserSlice"

function Update() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  console.log("this is a current user", currentUser)
  const [newData, setnewData] = useState([])

  const handleChange = (e) => {
    setnewData({ ...newData, [e.target.name]: e.target.value })
  }
  const handelSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(newData),
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      toast.success(data.message)
      dispatch(updateSuccess(data.rest))
      navigate("/")
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-12 w-auto rounded-full"
          alt="Your Company"
          title="logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
          Profile
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handelSubmit}>
          <div>
            <div className="mt-2"></div>
          </div>
          <div>
            <div className="mt-2">
              <input
                name="name"
                placeholder="name"
                type="text"
                value={newData.name}
                onChange={handleChange}
                defaultValue={currentUser.name}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                placeholder="email"
                value={newData.email}
                onChange={handleChange}
                defaultValue={currentUser.email}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                placeholder="password"
                value={newData.password}
                onChange={handleChange}
                defaultValue={currentUser.password}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
          <hr />
        </form>
      </div>
    </div>
  )
}

export default Update
