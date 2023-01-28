import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../helpers/getScrollAnimation";
import ScrollAnimationWrapper from "../components/ScrollAnimationWrapper";
import ApplicationItem from "../components/UI/ApplicationItem";

import { APPLICATION } from "../mock/application.mock";
import img from "../assets/Illustration2.png";

const features = [
  "Powerfull online protection.",
  "Internet without borders.",
  "Supercharged VPN",
  "No specific time limits.",
];

const Applications = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="applications"
    >
      {APPLICATION.map((item, index) => (
        <ApplicationItem
          key={index}
          titleSection={item.titleSection}
          descriptionSection={item.descriptionSection}
          imageSection={item.imageSection}
          features={item.features}
        />
      ))}
    </div>
  );
};

export default Applications;
