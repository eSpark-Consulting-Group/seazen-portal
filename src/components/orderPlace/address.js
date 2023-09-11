import React from 'react'
import '../../screens/order/style.css'

function formatAddress(input) {
  
  if (!input) {
    return ''; // Return an empty string if the input is undefined or empty
  }

  // Split the input string by spaces
  const parts = input.split(' ');

  // Group the parts into lines based on certain conditions
  const lines = [];
  let currentLine = '';

  parts.forEach((part) => {
    // If part includes a colon or a comma, start a new line
    if (part.includes(':') || part.includes(',')) {
      if (currentLine !== '') {
        lines.push(currentLine.trim()); // Remove leading/trailing spaces
        currentLine = '';
      }
    }

    // Add the part to the current line
    currentLine += ' ' + part;
  });

  // Push the last line
  if (currentLine !== '') {
    lines.push(currentLine.trim()); // Remove leading/trailing spaces
  }

  return lines.join('\n');
}
const Address = ({ address }) => {
  const formattedAddress = formatAddress(address);
  console.log(formattedAddress);

  return (
    <div className='address-text'>
        <p>Office - Seazen Ardia</p>
        <pre className="formatted-address">{formattedAddress}</pre>
    </div>
  )
}

export default Address
