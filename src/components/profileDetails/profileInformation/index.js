import React from 'react';
import ProfileStructure from '../profileStructure';

function ProfileInformation() {
  const user = {
    name: 'John Doe',
    phoneNumber: '+965 1234 5678',
    email: 'john@doe.com',
    imageUrl: '/assets/img/profile image.svg',
  };

  const handleEditClick = () => {
    // Handle edit button click here
  };

  return (
    <div>
      <ProfileStructure
        name={user.name}
        phoneNumber={user.phoneNumber}
        email={user.email}
        imageUrl={user.imageUrl}
        onEditClick={handleEditClick}
      />
    </div>
  );
}

export default ProfileInformation;
