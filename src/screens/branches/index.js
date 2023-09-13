import React from 'react'
import BranchHeader from '../../components/branches-hours/headerBranch'
import BranchContent from '../../components/branches-hours/content'
import RestaurantInfo from '../../components/branches-hours/branch'

export const Branches = () => {
  const restaurantData = [
    {
      id: 1,
      name: 'Restaurant 1',
      weekdayHours: '10:00 AM - 8:00 PM',
      weekendHours: '11:00 AM - 9:00 PM',
    },
    {
      id: 2,
      name: 'Restaurant 2',
      weekdayHours: '9:00 AM - 7:00 PM',
      weekendHours: '10:00 AM - 8:00 PM',
    },
    {
      id: 3,
      name: 'Restaurant 3',
      weekdayHours: '9:00 AM - 7:00 PM',
      weekendHours: '10:00 AM - 8:00 PM',
    },
    // Add more restaurant objects as needed
  ];
  return (
    <div>
        <BranchHeader/>
        <BranchContent/>

        <RestaurantInfo restaurants={restaurantData} />;






    </div>
  )
}
