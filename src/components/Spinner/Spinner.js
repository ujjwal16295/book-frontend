import {React} from 'react'
import "./Spinner.css"
import { ClipLoader } from 'react-spinners'

export const Spinner = (props) => {
  return (
        <ClipLoader
        loading={props.loading}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}
