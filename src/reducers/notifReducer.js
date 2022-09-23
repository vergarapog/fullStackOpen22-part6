import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  time: 0,
}

const notifSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      const { message, time } = action.payload
      console.log(message, time)

      return { message, time }
    },
    resetNotif(state, action) {
      return { message: "", time: 0 }
    },
  },
})

export const { setMessage, resetNotif } = notifSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setMessage({ message, time }))
  }
}

export default notifSlice.reducer
