import React, { useState } from "react";
import WarningModal from "../components/Modals/WarningModal";
import Footer from "../components/UI/Footer";
import Hero from "../components/UI/Hero";
import Navbar from "../components/UI/Navbar";
import Applications from "./Applications";
import Social from "../components/UI/Social";

const Index = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div>
        <Hero />
        <Applications />
        <Social />
        {isOpen && <WarningModal setIsOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default Index;
