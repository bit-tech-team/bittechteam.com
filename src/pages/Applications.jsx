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
      {/* <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 y-8 my-12">
        <ScrollAnimationWrapper>
          <motion.div
            className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12"
            variants={scrollAnimation}
          >
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
              We Provide Many Features You Can Use
            </h3>
            <p className="my-2 text-black-500">
              You can explore the features that we provide with fun and have
              their own functions each feature.
            </p>
            <ul className="text-black-500 self-start list-inside ml-8">
              {features.map((feature, index) => (
                <motion.li
                  className="relative circle-check custom-list"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={feature}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <img src={img} />
          </motion.div>
        </ScrollAnimationWrapper>
      </div> */}
    </div>
  );
};

export default Applications;
