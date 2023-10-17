import React from 'react'
import ProfileInformation from '../../components/profileDetails/profileInformation'
import ProfileHeader from '../../components/header/profileHeader'

export const Profile = () => {
  return (
    <div className="profileSectionContainer">
        <ProfileHeader/>
        <div className="px-3">
        <ProfileInformation/>
        </div>
        </div>
  )
}
