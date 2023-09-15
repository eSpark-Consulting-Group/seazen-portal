import React from 'react'
import { Modal, Slide, Rating } from '@mui/material';
import { useState } from 'react';

const RateCard = ({ isVisible, handleClose }) => {

    const [experience, setExperience] = useState(0);
    const [quality, setQuality] = useState(0);
    const [presentation, setPresentation] = useState(0);
    const [service, setService] = useState(0);
    const average = (experience + quality + presentation + service) / 4;


    return (
        <div>
            <Modal
                open={isVisible}
                onClose={() => handleClose(average)}

            >
                <Slide direction="up" in={isVisible}>
                    <div style={{ backgroundColor: "white" , position:"absolute", bottom:"0"}} className='rate-screen'>
                        <div id='rate-head'>How satisfied are you with your order?</div>
                        <div className='rate-cat'>
                            <div id='rate-cat-text'>Overall Experience</div>
                            <Rating
                                name="simple-controlled"
                                value={experience}
                                onChange={(event, newValue) => {
                                    setExperience(newValue);
                                }}
                                sx={{
                                    fontSize: "40px", ".MuiRating-iconEmpty": {
                                        color: '#F7BE37', // Red color for the default state
                                    },
                                }}
                            />
                        </div>
                        <div className='rate-cat'>
                            <div id='rate-cat-text'>Food & Drinks<br />Quality</div>
                            <Rating
                                name="simple-controlled"
                                value={quality}
                                onChange={(event, newValue) => {
                                    setQuality(newValue);
                                }}
                                sx={{
                                    fontSize: "40px", ".MuiRating-iconEmpty": {
                                        color: '#F7BE37', // Red color for the default state
                                    },
                                }}
                            />
                        </div>
                        <div className='rate-cat'>
                            <div id='rate-cat-text'>Presentation</div>
                            <Rating
                                name="simple-controlled"
                                value={presentation}
                                onChange={(event, newValue) => {
                                    setPresentation(newValue);
                                }}
                                sx={{
                                    fontSize: "40px", ".MuiRating-iconEmpty": {
                                        color: '#F7BE37', // Red color for the default state
                                    },
                                }}
                            />
                        </div>
                        <div className='rate-cat'>
                            <div id='rate-cat-text'>Service &<br />Speed</div>
                            <Rating
                                name="simple-controlled"
                                value={service}
                                onChange={(event, newValue) => {
                                    setService(newValue);
                                }}
                                sx={{
                                    fontSize: "40px", ".MuiRating-iconEmpty": {
                                        color: '#F7BE37', // Red color for the default state
                                    },
                                }}
                            />
                        </div>
                    </div>
                </Slide>
            </Modal>
        </div>
    )
}

export default RateCard
