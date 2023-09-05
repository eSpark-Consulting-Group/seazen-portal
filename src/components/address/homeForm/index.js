import React from 'react'
import './style.css'

export const HomeAdress = () => {
  return (
    <form>
    <input class='form-style' type="text" name="Block" placeholder='Block' required />
    <input class='form-style' type="text" name="Street" placeholder='Street' />
    <input class='form-style' type="text" name="Avenue" placeholder='Avenue' />
    <input class='form-style' type="text" name="House Number" placeholder='House Number' />
    <input class='form-style' type="text" name="Address Label" placeholder='Address Label' />
    <input class='form-style' type="text" name="Additional Direction" placeholder='Additional Direction' />
  </form>
  )
}
