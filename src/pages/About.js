import React from 'react';
import { motion } from 'framer-motion';

// components
import HeroContainer from '../components/HeroContainer';

import { pageAnim } from '../utils/_helpers';

const About = () => {
  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          About Us
        </h2>
      </HeroContainer>
      <div className="lg:w-1/2 px-2 lg:px-0 text-primary-900 mx-auto my-10">
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Company Profile</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Kingsports is a Sports-Tech company dully registered with the
            Nigerian Corporate Affairs Commission (CAC) in 2016. Started
            Operations in 2019. Created in concomitance with the modern
            technological trend, We proffers solutions to issues affecting the
            modern day footballing system.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Our Mission</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Our mission is to build a suitable, reliable and sustainable online
            platform (iOS and Android mobile application) for 24 hours sports
            news, discussions (forum),football fixtures/results, live scores and
            punditry with the help of Artificial Intelligence(AI) and sequential
            data calculation and analysis. Our app offers a strong database
            system for player profiling thereby curbing age cheat in Africa,
            including knowing, tracking and signing grassroots players at young
            age .
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Our Vision</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Our vision entails becoming the leading sports company in the World,
            We envision a strong grassroot player profiling system where highly
            talented footballers around the world especially in Africa can
            project themselves and get signed by professional clubs, we are
            everything football.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default About;
