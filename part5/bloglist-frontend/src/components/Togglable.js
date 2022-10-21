import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.buttonUp ?
          <div>
            <button onClick={toggleVisibility}>{props.buttonLabelEnd}</button>
            {props.children}
          </div>:
          <div>
            {props.children}
            <button onClick={toggleVisibility}>{props.buttonLabelEnd}</button>
          </div>
        }
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonLabelEnd: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable