import React from "react";
import "../../assets/css/modal.css";

const WarningModal = ({ setIsOpen }) => {
  return (
    <>
      {/* <div className="darkBG" onClick={() => setIsOpen(false)} /> */}
      <div className="z-40 centered">
        <div className="modal xl:w-[600px]">
          <div className="modalHeader">
            <h5 className="heading">Warning</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" "" /> */}x
          </button>
          <div className="modalContent">
            This project is still in a state of development, so it is very
            likely that you will find links that do not work, or style errors
            among others, the same applies to the subdomains of this project.
          </div>
          <div className="modalContent">
            Thank you for your patience, we hope to have a production version
            ready soon.
          </div>
          <div className="modalContent">
            <p>
              <b> Join discord for news and updates</b>
            </p>
            <div className="flexer">
              <a href="https://discord.gg/mJaP9TJJXF" target="_blank">
                <img
                  src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
                  alt="Discord Banner 4"
                />
              </a>
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarningModal;
