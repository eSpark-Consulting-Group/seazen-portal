import React from 'react';
import Structure from '../structure';

function Information() {
  const user = {
    name: 'Guest',
    register: 'Register to start ordering',
    imageUrl: '/assets/img/guest-profile-image.svg',
  };

  const handleEditClick = () => {
    // Handle edit button click here
  };

  return (
    <div>
      <Structure
        name={user.name}
        register={user.register}
        imageUrl={user.imageUrl}
        onEditClick={handleEditClick}
      />
    </div>
  );
}

export default Information;
