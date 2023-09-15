import React from 'react'
import { Typography, IconButton} from '@mui/material';
import '../../screens/myorder/style.css'
import { useNavigate } from 'react-router';
import { paths } from '../../routes/paths';

const OrderNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className='my-orderscreen-nav'>
    <IconButton onClick={()=>{navigate(paths.profile)}}>
        <img src="/assets/img/Arrow.png" alt="" />
    </IconButton>
    <Typography variant="h5" component="h2" fontWeight={700} color="#1F2933">
        My Orders
    </Typography>
    <IconButton className='brand-logo'>
        <img src="/assets/img/Group 259.png" alt="" />
    </IconButton>
</div>
  )
}

export default OrderNavbar
