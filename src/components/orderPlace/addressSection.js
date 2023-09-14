import React, { useState } from 'react'
import Address from './address'

const AddressSection = () => {
        const [address, setAddress] = useState("Block 6 Hamad Al Mubarak St. House: 35 Floor: 2 Apartment: 2");
  return (
      <div className='orderaddress-section'>
        <hr />
        <div>
              <Address address={address} />
        </div>
        <hr />
      </div>
  )
}

export default AddressSection
