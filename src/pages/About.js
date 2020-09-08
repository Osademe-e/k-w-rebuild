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
      <div className="lg:container px-2 lg:px-0 text-primary-900 mx-auto my-10">
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Company Profile</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Kingsports is a sports company dully registered with the Nigerian
            Corporate Affairs Commission (CAC) in 2016. Started Operations in
            2019. Created in concomitance with the modern technological trend,
            Kingsports is a sport-tech company that proffers solutions to issues
            affecting the modern day footballing system.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Our Mission</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            To become the leading sports company in Africa, to become the best
            football pundit in the world. We envision a strong football player
            profiling system where highly talented grass-root footballers around
            the world can project themselves and get signed by clubs around the
            world.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Our Vision</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Our mission is to build a strong suitable, reliable and sustainable
            online platform (iOS and Android mobile application) for 24 hours
            sports news, football fixtures/results, live scores, football
            pundits and using the block chain technology for player's profiling
            thereby curbing age cheat in Nigeria and Africa football system.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default About;
