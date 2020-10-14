import React from 'react';
import { motion } from 'framer-motion';

// components
import HeroContainer from '../components/HeroContainer';

import { pageAnim } from '../utils/_helpers';

const PrivacyPolicy = () => {
  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          Privacy Policy
        </h2>
      </HeroContainer>
      <div className="lg:w-1/2 px-2 lg:px-0 text-primary-900 mx-auto my-10">
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Privacy Policy</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Kingsports Limited was designed to bring people closer. We aid you
            connect with friends and family interactively on sports related
            matters. We recognize that people use our platform to connect,
            socialize and interact with others but not everyone wants to share
            everything with everyone – including with us. It’s important that
            you have choices when it comes to how your data is used. These are
            the principles that guide how we approach privacy at Kingsports
            Limited.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">
            {' '}
            We design privacy into our products from the outset
          </h2>
          <p className="text-sm lg:text-base leading-relaxed">
            We design privacy into Kingsports products(android app, website,
            ios) with guidance from experts in areas like data protection and
            privacy law, security, interface design, engineering, product
            management, and public policy. Our privacy team works to build these
            diverse perspectives into every stage of our product development.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">
            We work hard to keep your information secure
          </h2>
          <p className="text-sm lg:text-base leading-relaxed">
            We work engagingly to help protect people’s accounts, and we build
            security into every Kingsports product. Our security systems run
            millions of times per second to help catch threats automatically and
            remove them before they ever threaten your accounts.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">
            You own and can delete your information
          </h2>
          <p className="text-sm lg:text-base leading-relaxed">
            You own the data and information you share on Kingsports. This means
            you decide what you share on Kingsports Limited. That is why we make
            provision for deleting anything you have posted.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">Improvement is constant</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            We are constantly working to develop new controls and design them in
            ways that explain things to people clearly. We invest in research
            and work with experts beyond Kingsports Limited including designers,
            developers, privacy professionals and regulators.
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-xl lg:text-3xl">We are accountable</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            In addition to comprehensive privacy reviews, we put products
            through rigorous data security testing. We also meet with
            regulators, legislators and privacy experts around the world to get
            input on our data practices and policies.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
