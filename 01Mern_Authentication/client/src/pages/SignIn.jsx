import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchEnd, fetchStart, fetchSuccess } from "../App/User/UserSlice"
import toast from "react-hot-toast"
function SignIn() {
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [fromData, setFromData] = useState([])
  console.log(fromData)
  const handleChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    dispatch(fetchStart())
    e.preventDefault()
    const Data = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(fromData),
    })
    const result = await Data.json()
    if (result.success === false) {
      dispatch(fetchEnd())
      throw new Error(result.message)
    }
    dispatch(fetchSuccess(result))
    toast.success(`wellcome, ${result.name?.toUpperCase()}`)
    navigate("/")
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          title="logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 uppercase">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="mt-2"></div>
          </div>
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? `LOADING...` : `SIGN UP`}
            </button>
          </div>
          <hr />
          {/* <div>
            <OAuth />
          </div> */}
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
  )
}

export default SignIn
