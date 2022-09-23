import { setFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    const filter = event.target.value

    props.setFilter(filter)
  }

  const style = {
    marginBottom: 10,
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} name="filter" />
    </div>
  )
}

const ConnectedFilter = connect(null, { setFilter })(Filter)

export default ConnectedFilter
