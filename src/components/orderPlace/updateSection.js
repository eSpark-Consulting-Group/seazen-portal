import React from 'react'
import '../../screens/order/style.css'
import CurrentTime from './currentTime'

const UpdateSection = () => {
  return (
          <div className='update-sec'>
              <p id='text-for-arrival'>Estimated Arrival;</p>
              <CurrentTime/>
          </div>
  )
}

export default UpdateSection
