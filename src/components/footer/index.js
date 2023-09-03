import React, { useState } from 'react';
import Modal from 'react-modal';
import './style.css'



Modal.setAppElement('#root');

export const Footer = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
  const [text, setText] = useState('');
  
  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
  }
  return (
    <div className='footer-container'>
        <h2 className='footer-style'>© 2023 Seazen Group Co.</h2>
        <p className='terms-style'>Terms & Conditions | Privacy Policy</p>
        <img className='text-box' src="/assets/img/Comment_Icon.png" alt="Image" onClick={openModal} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Text Editor"
      >
        <h2>Image Text Editor</h2>
        <img src="/assets/img/Comment_Icon.png" alt="Image" />

        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Write your text here..."
          rows="5"
          cols="40"
        ></textarea>

        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  )
}
