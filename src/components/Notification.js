import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { resetNotif } from "../reducers/notifReducer"

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const time = useSelector((state) => state.notification.time)
  const dispatch = useDispatch()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    const notifTimer = setTimeout(() => {
      dispatch(resetNotif())
    }, `${time}000`)
    return () => clearTimeout(notifTimer)
  })

  if (message === "") {
    return
  }
  return <div style={style}>{message}</div>
}

export default Notification
