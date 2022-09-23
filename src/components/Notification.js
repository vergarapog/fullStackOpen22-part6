import { connect } from "react-redux"
import { useEffect } from "react"
import { resetNotif } from "../reducers/notifReducer"

const Notification = (props) => {
  // const message = useSelector((state) => state.notification.message)
  // const time = useSelector((state) => state.notification.time)
  // const dispatch = useDispatch()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    const notifTimer = setTimeout(() => {
      props.resetNotif()
    }, `${props.notification.time}000`)
    return () => clearTimeout(notifTimer)
  })

  if (props.notification.message === "") {
    return
  }
  return <div style={style}>{props.notification.message}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps, { resetNotif })(
  Notification
)

export default ConnectedNotification
