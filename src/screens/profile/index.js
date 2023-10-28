import React from 'react'
import ProfileInformation from '../../components/profileDetails/profileInformation'
import ProfileHeader from '../../components/header/profileHeader'
import { BsHouseDoor } from "react-icons/bs"; 


export const Profile = () => {
  return (
    <div className="profileSectionContainer">
        <ProfileHeader  customIcon={
          <BsHouseDoor
            size={22}
            color="black"
            style={{
              position:"absolute",
              top:"8px",
              left:"9.5px",
            }}
          />
        } />
        <div className="px-3">
        <ProfileInformation/>
        </div>
        </div>
  )
}
