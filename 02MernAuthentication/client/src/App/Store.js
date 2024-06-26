import { configureStore } from "@reduxjs/toolkit"
import userReduser from "./Feature/UserSlice"

export const store = configureStore({
  reducer: {
    user: userReduser,
  },
})
