import { configureStore } from "@reduxjs/toolkit"
import userReduser from "./User/UserSlice"
export const store = configureStore({
  reducer: {
    user: userReduser,
  },
})
