import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : null,
  loading: false, 
}

const userSlide = createSlice({
  name: "User",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true
    },
    fetchEnd: (state, action) => {
      state.loading = false
      sessionStorage.setItem(null)
    },
    fetchSuccess: (state, action) => {
      state.currentUser = action.payload
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload))
      state.loading = false
    },

    logoutUser: (state, action) => {
      sessionStorage.clear()
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload))
      state.loading = false
    },
  },
})

export const { fetchStart, fetchEnd, fetchSuccess, logoutUser, updateSuccess } =
  userSlide.actions

export default userSlide.reducer
