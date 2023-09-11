import React, { useState, useEffect } from 'react';
import '../../screens/order/style.css'


const UpdateSection = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Function to get the current time and date in the desired format
    const getCurrentTimeAndDate = () => {
      const now = new Date();
      const day = now.getDate();
      const monthIndex = now.getMonth();
      const year = now.getFullYear();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? 'pm' : 'am';
      const shortMonths = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      // Create the formatted date and time string
      const formattedDateTime = `${day} ${shortMonths[monthIndex]}, ${hours % 12 || 12}:${formattedMinutes} ${period}`;

      setCurrentDateTime(formattedDateTime);
    };

    // Call the function to update the current date and time
    getCurrentTimeAndDate();

    // Update the date and time every minute (optional)
    const intervalId = setInterval(getCurrentTimeAndDate, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
          <div className='update-sec'>
              <p id='text-for-arrival'>Estimated Arrival;</p>
              <p className='current-time'>{currentDateTime}</p>
              {/* <CurrentTime/> */}
          </div>
  )
}

export default UpdateSection
