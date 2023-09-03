import React from 'react'
import Navbar from '../../components/header/index';
import Slider from '../../components/carousel/slider/index';
import BasicCard from '../../components/cards';
import '../../components/carousel/slider/style.css'
import IconButton from '../../components/category/button';
import Button from '../../components/category/button';
import Collapsible from '../../components/category/button';
import DraggableSlider from '../../components/draggableSlider';
import { Footer } from '../../components/footer';

const Home = () =>{
  return (
    <div>
        <Navbar/>
        <div className="card-spacing">
        <Slider/>
        </div>
        <Button/>
        < BasicCard/>
        <DraggableSlider/>
       <Footer/>
    </div>
  )
}

export default Home;