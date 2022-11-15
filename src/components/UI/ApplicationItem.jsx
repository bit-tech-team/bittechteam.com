import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../../helpers/getScrollAnimation";
import ScrollAnimationWrapper from "../ScrollAnimationWrapper";

import check from "../../assets/images/Icon/checklist.svg";

const ApplicationItem = (props) => {
  const { titleSection, descriptionSection, imageSection, features } = props;
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 y-8 my-12">
      <ScrollAnimationWrapper>
        <motion.div
          className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12"
          variants={scrollAnimation}
        >
          <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
            {titleSection}
          </h3>
          <p className="my-2 text-black-500">{descriptionSection}</p>
          <ul className="text-black-500 self-start list-inside ml-8">
            {features.map((feature, index) => (
              <div key={index} className="flex">
                <img src={check} />
                <motion.li
                  className="relative circle-check custom-list ml-4"
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
              </div>
            ))}
          </ul>
        </motion.div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper className="flex w-full justify-end">
        <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
          <img src={imageSection} />
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default ApplicationItem;
