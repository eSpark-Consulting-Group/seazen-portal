import React from 'react'
import Navbar from '../../components/header/index';
import Slider from '../../components/carousel/slider/index';
import BasicCard from '../../components/cards';
import '../../components/carousel/slider/style.css'

const Home = () =>{
  return (
    <div>
        <Navbar/>
        <div className="card-spacing">
        <Slider/>
        </div>
        < BasicCard/>
    </div>
  )
}

export default Home;