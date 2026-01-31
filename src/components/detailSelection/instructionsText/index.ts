import React, { useState } from 'react';
import './style.css'

function SpecialInstructions() {
  // State to store the user's special instructions
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Function to handle changes in the textarea
  const handleInstructionsChange = (event) => {
    setSpecialInstructions(event.target.value);
  };

  return (
    <div>
      
      <textarea
        id="special-instructions"
        name="special_instructions"
        rows="4"
        cols="50"
        value={specialInstructions}
        onChange={handleInstructionsChange}
        className='special-instructions'
        placeholder='Special Instructions (Optional)'
      ></textarea>
    </div>
  );
}

export default SpecialInstructions;
