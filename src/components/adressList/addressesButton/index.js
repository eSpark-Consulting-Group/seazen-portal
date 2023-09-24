import React from 'react'
import styles from "./style.module.css"
import { useNavigate } from 'react-router'
import { paths } from '../../../routes/paths';
import { style } from '@mui/system/Stack/createStack';

export const AddressesButton = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.addressButton}>
        <button className={`${styles.addressesAddButton} container`} onClick={()=>{navigate(paths.location)}}><span className={styles.addressesAddButtonText}>Add New Address</span></button>
    </div>
  )
}
