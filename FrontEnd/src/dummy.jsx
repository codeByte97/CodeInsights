import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import './dummy.css';
import { Link } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import { IoMdCheckmarkCircle } from "react-icons/io";
function App(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null);
  const [CopiedInput, setCopiedInput] = useState(false);
  const handleCopy = () => {
    if (inputRef.current) {
      // Select the text inside the <pre> element
      const textToCopy = inputRef.current.textContent;
      console.log(textToCopy);
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();

      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedInput(true);
    setTimeout(function () {
      setCopiedInput(false);
    }, 500);

  }
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button onClick={openModal}>View Code</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <button className="close-button" onClick={closeModal}>&times;</button>
        <h2><Link style={{ color: 'blue' }} to={`/Problem/${props.ContestName}/${props.ProblemName}`}>{props.ProblemName} </Link> <span>{props.result}</span>  </h2>
        <h2><Link style={{ color: 'blue' }} to={`/Contest/${props.ContestName}`}>{props.ContestName}</Link></h2>
        {CopiedInput === true ? <IoMdCheckmarkCircle color="#3FFF00" className="copy-icon" /> : <MdContentCopy onClick={() => handleCopy('output')} className="copy-icon" />}
        <div ref={inputRef} >
          <pre>{props.Code}</pre>
        </div>
        {props.result==='CE'?<div>
        <h1>Compilation Error</h1>
          <pre>{props.CompError}</pre>
        </div>:null}
      </Modal>
    </div>
  );
}
export default App;
