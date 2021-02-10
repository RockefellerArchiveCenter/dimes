import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const MaterialIcon = ({ icon }) => (
  icon === 'archive_box' ?
    (<span aria-hidden='true'>
      <svg version='1.1' width='12px' height='12px' viewBox='0 0 475.078 475.077' fill='#A75C39'>
        <path d='M438.536,146.177H36.547c-4.952,0-9.235,1.807-12.85,5.424c-3.617,3.615-5.424,7.898-5.424,12.847v274.084
          c0,4.948,1.807,9.233,5.424,12.847c3.615,3.617,7.898,5.428,12.85,5.428h401.989c4.949,0,9.229-1.811,12.847-5.428
          c3.614-3.613,5.421-7.898,5.421-12.847V164.448c0-4.952-1.8-9.231-5.421-12.847C447.769,147.984,443.485,146.177,438.536,146.177z
           M286.927,232.113c-3.613,3.616-7.898,5.424-12.847,5.424h-73.089c-4.946,0-9.229-1.809-12.847-5.424
          c-3.615-3.617-5.424-7.898-5.424-12.85c0-4.948,1.809-9.231,5.424-12.847c3.617-3.617,7.9-5.426,12.847-5.426h73.096
          c4.945,0,9.227,1.809,12.847,5.426c3.614,3.615,5.421,7.898,5.421,12.847C292.355,224.214,290.544,228.496,286.927,232.113z' />
        <path d='M469.658,23.695c-3.618-3.617-7.898-5.424-12.848-5.424H18.272c-4.948,0-9.231,1.807-12.847,5.424
          C1.809,27.31,0,31.593,0,36.542v73.089c0,4.948,1.809,9.229,5.426,12.847c3.616,3.617,7.898,5.424,12.847,5.424h438.531
          c4.948,0,9.233-1.807,12.854-5.424c3.613-3.617,5.42-7.898,5.42-12.847V36.542C475.078,31.59,473.271,27.31,469.658,23.695z' />
      </svg>
    </span>) :
    (<span className='material-icons' aria-hidden='true'>{icon}</span>)
)

MaterialIcon.propTypes = {
  icon: PropTypes.string.isRequired
}

export default MaterialIcon
