import React, { useState } from "react";
import WarningModal from "../components/Modals/WarningModal";
import Footer from "../components/UI/Footer";
import Hero from "../components/UI/Hero";
import Navbar from "../components/UI/Navbar";
import Applications from "./Applications";

const Index = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="z-30">
        <Navbar />
        <Hero />
        <Applications />
        <Footer />
        {isOpen && <WarningModal setIsOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default Index;
