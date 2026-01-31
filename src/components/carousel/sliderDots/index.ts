import { color } from 'framer-motion';
import React from 'react'

const MyDot = ({ isActive }) => (
    <span
      style={{
        display: 'inline-block',
        height: isActive ? '10px' : '6px', 
        width: isActive ? '10px' : '6px',
        background: isActive ? '#2F2F37' : '#DEDEE3',
        borderRadius: '50px'
      }}
    ></span>
  )
  export default MyDot;