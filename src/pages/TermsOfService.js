import React from 'react';
import { motion } from 'framer-motion';

// components
import HeroContainer from '../components/HeroContainer';

import { pageAnim } from '../utils/_helpers';

const TermsOfService = () => {
  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      exit="exit">
      <HeroContainer>
        <h2 className="text-primary-100 font-semibold lg:container mx-auto text-xl lg:text-5xl px-2 lg:px-0 my-6">
          Terms of Service
        </h2>
      </HeroContainer>
      <div className="lg:w-1/2 px-2 lg:px-0 text-primary-900 mx-auto my-10">
        <section className="mb-3">
          <h2 className="text-xl font-semibold">PRODUCTS</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            The Kingsports Products includes our website www.kingsports.pro and
            our mobile app (including the Kingsports mobile app and in-app
            browser) where we offer the following services; 24 hours sports news
            and updates, livescores, football fixtures / results, an interactive
            forum for comments on sports related topics and a premium package
            punditory tips.
          </p>
          <h2 className="text-xl font-semibold mt-2">
            KINGSPORTS MOBILE AND DESKTOP APP{' '}
          </h2>
          <p className="text-sm lg:text-base leading-relaxed">
            You can access Kingsports and stay connected on many devices
            including iPhone, iPad, Android, Windows and feature phones. To see
            what's new with the app and install the latest version, you can go
            visit your phone's app store (ex: iTunes App Store, Google Play
            Store, Windows Store).
          </p>
        </section>
        <section className="mb-3">
          <h2 className="text-2xl font-semibold">Terms of Service</h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Welcome to Kingsports! <br />
            <br />
            Kingsports builds technologies that enables 24 hours sports news,
            sport fixtures/results, football punditory, livescores, football
            players profiling for efficient scouting with interactive forum for
            people to connect with each other on sports related topics. These
            Terms govern your use of Kingsports website and mobile app, except
            where we expressly state that separate terms (and not these)
            <br />
            <br />
            We don’t charge you to use Kingsports platform or the other products
            and services covered by these terms except for our premium package
            punditry tips where users are asked to pay on monthly bases.
            <br />
            <br />
            We don’t sell your personal data to advertisers, and we don’t share
            information that directly identifies you (such as your name, email
            address or other contact information)
          </p>
        </section>
        <section className="mb-3">
          <ol className="list-decimal text-2xl font-semibold">
            <li>
              <h2 className="text-2xl font-semibold">
                The services we provide
              </h2>
              <p className="text-sm lg:text-base leading-relaxed font-normal">
                Our mission is to provide the best platform for players
                profiling and scouting in Africa, to promote potentials and put
                talents in limelight, build communities and bring the world
                closer together.
                <br />
                To help advance this mission we ensure your experience on
                Kingsports Limited is unlike anyone else's: from the posts,
                stories, events, and other football related contents you see in
                News Feed or our video platform to the interactive forum.
                <br />
                <br />
                <span className="font-semibold">
                  We empower you to express yourself and communicate about what
                  matters to you in sports related topics:
                </span>
                <br />
                There are many ways to express yourself on Kingsports Limited
                and to communicate with friends, family, and others about what
                matters to you - for example interacting on our inherent forum
                here on our app/website or on all our social media pages like
                Facebook, Youtube, Twitter and Instagram.
              </p>
              <p className="text-sm lg:text-base leading-relaxed font-normal mt-5">
                We developed advanced technologies to provide safe and
                functional services for everyone: We develop automated systems
                to improve our ability to detect and remove abusive and
                dangerous activity that may harm our community and the integrity
                of our Products.
                <br />
                <br />
                <span className="font-semibold">
                  Research ways to make our services better:
                </span>
                <br />
                We engage in research to develop, test, and improve our
                Products. This includes analyzing the data we have about our
                users and understanding how people use our Products, for example
                by conducting surveys and testing and troubleshooting new
                features.
                <br />
                <br />
                Our Data Policy explains how we use data to support this
                research for the purposes of developing and improving our
                services.
                <br />
                <br />
                <span className="font-semibold">
                  Enable global access to our services:
                </span>
                <br />
                To operate our global service, we need to store and distribute
                content and data in our data centers and systems around the
                world, including outside your country of residence.
              </p>
            </li>
            <li className="mt-3">
              <h2 className="text-2xl font-semibold">
                Your commitments to Kingsports Limited and our community
              </h2>
              <div className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                We provide these services to you and others to help advance our
                mission. In exchange, we need you to make the following
                commitments:
                <ol className="list-decimal">
                  <li className="mt-3">
                    <h2>Who can use Kingsports?</h2>
                    <p className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                      When people stand behind their opinions and actions, our
                      community is safer and more accountable. For this reason,
                      you must:
                      <ul className="list-disc ml-2">
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          Use the same name that you use in everyday life.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          Provide accurate information about yourself.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          Create only one account (your own) and use your
                          accounts for personal purposes.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          Not share your password, give access to your
                          Kingsports account to others, or transfer your account
                          to anyone else (without our permission).
                        </li>
                      </ul>
                    </p>
                  </li>
                  <li className="mt-3">
                    <p className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                      We try to make Kingsports Limited broadly available to
                      everyone, but you cannot use Kingsports Products if:
                      <ul className="list-disc ml-2">
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          You are under 13 years old (or the minimum legal age
                          in your country to use our Products).
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          You are a convicted sex offender.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          We've previously disabled your account for violations
                          of our Terms or Policies.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          You are prohibited from receiving our products,
                          services, or software under applicable laws.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          You must not use abusive words while interacting on
                          our platforms, words such as; fuck, fuck-you, bastard,
                          idiot, fool, animal, goat and other derogatory words
                          not mentioned above.
                          <ol className="mt-3 list-decimal ml-2">
                            <li className="text-sm leading-relaxed font-normal mt-1">
                              You may not use our Products to do or share
                              anything:
                              <ul className="list-disc ml-2">
                                <li className="text-sm leading-relaxed font-normal mt-1">
                                  That violates these Terms, our community
                                  standards and 
                                  <span className="underline">
                                    other terms and policies
                                  </span>
                                   that apply to your use of Kingsports.
                                </li>
                                <li className="text-sm leading-relaxed font-normal mt-1">
                                  That is unlawful, misleading, discriminatory
                                  or fraudulent.
                                </li>
                                <li className="text-sm leading-relaxed font-normal mt-1">
                                  That infringes or violates someone else's
                                  rights, including their intellectual property
                                  rights.
                                </li>
                              </ul>
                            </li>
                            <li className="text-sm leading-relaxed font-normal mt-1">
                              You may not upload viruses or malicious code or do
                              anything that could disable, overburden, or impair
                              the proper working or appearance of our Products.
                            </li>
                            <li className="text-sm leading-relaxed font-normal mt-1">
                              You may not access or collect data from our
                              Products using automated means (without our prior
                              permission) or attempt to access data you do not
                              have permission to access.
                            </li>
                          </ol>
                          <br />
                          We can remove or restrict access to content that is in
                          violation of these provisions. If we remove content
                          that you have shared in violation of our Community
                          Standards, we’ll let you know and explain any options
                          you have to request another review, unless you
                          seriously or repeatedly violate these Terms or if
                          doing so may expose us or others to legal liability;
                          harm our community of users; compromise or interfere
                          with the integrity or operation of any of our
                          services, systems or Products; where we are restricted
                          due to technical limitations; or where we are
                          prohibited from doing so for legal reasons. To help
                          support our community, we encourage you
                          to report content or conduct that you believe violates
                          your rights (including intellectual property rights)
                          or our terms and policies.
                        </li>
                      </ul>
                    </p>
                  </li>
                  <li className="mt-3">
                    The permissions you give us
                    <p className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                      We need certain permissions from you to provide our
                      services:
                      <ol className="list-decimal ml-2">
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          <span className="underline">
                            Permission to use content you create and share:
                          </span>
                           Some content that you share or upload, such as photos
                          or videos, may be protected by intellectual property
                          laws.
                          <br />
                          <br />
                          You own the intellectual property rights (things like
                          copyright or trademarks) in any such content that you
                          create and share on Kingsports Limited. Nothing in
                          these Terms takes away the rights you have to your own
                          content. You are free to share your content with
                          anyone else, wherever you want.
                          <br />
                          <br />
                          However, to provide our services we need you to give
                          us some legal permissions (known as a ‘license’) to
                          use this content. This is solely for the purposes of
                          providing and improving our Products and services as
                          described in Section 1 above.
                          <br />
                          <br />
                          Specifically, when you share, post, or upload content
                          that is covered by intellectual property rights on or
                          in connection with our Products, you grant us a
                          non-exclusive, transferable, sub-licensable,
                          royalty-free, and worldwide license to host, use,
                          distribute, modify, run, copy, publicly perform or
                          display, translate, and create derivative works of
                          your content (consistent with
                          your privacy and application settings). This means,
                          for example, that if you share a photo on Kingsports
                          Limited , you give us permission to store, copy, and
                          share it with others (again, consistent with your
                          settings) such as service providers that support our
                          service or other Kingsports Products you use. This
                          license will end when your content is deleted from our
                          systems.
                          <br />
                          <br />
                          When you delete content, it’s no longer visible to
                          other users.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          <span className="underline">
                            Permission to use your name, profile picture, and
                            information about your actions with ads and
                            sponsored content:
                          </span>
                          You give us permission to use your name and profile
                          picture and information about actions you have taken
                          on Kingsports Limited next to or in connection with
                          ads, offers, and other sponsored content that we
                          display across our Products.
                        </li>
                        <li className="text-sm leading-relaxed font-normal mt-1">
                          <span className="underline">
                            Permission to update software you use or download:
                          </span>
                          If you download or use our software, you give us
                          permission to download and install updates to the
                          software where available.
                        </li>
                      </ol>
                    </p>
                  </li>
                  <li className="mt-3">
                    Limits on using our intellectual property
                    <p className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                      If you use content covered by intellectual property rights
                      that we have and make available in our Products (for
                      example, images, designs, videos, or sounds), we retain
                      all rights to that content (but not yours). You can only
                      use our copyrights or trademarks (or any similar marks) as
                      expressly permitted by our Brand Usage Guidelines or with
                      our prior written permission. You must obtain our written
                      permission (or permission under an open source license) to
                      modify, create derivative works of, decompile, or
                      otherwise attempt to extract source code from us.
                    </p>
                  </li>
                </ol>
              </div>
            </li>
            <li className="mt-3">
              <h2 className="text-2xl font-semibold">Gaming Policies</h2>
              <ol className="list-decimal">
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  All premium users are required to be 18 years and above,
                  Kingsports Limited bears no responsibility for situations
                  where underage users get involved in our premium games/
                  information.
                </li>
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  No refund of money after payment as been made pertaining to
                  subscription of our premium games/ information and thus every
                  payment made on this platform is binding till it’s stipulated
                  expiry date.
                </li>
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  Kingsports bears no responsibility whatsoever for any lost of
                  money incurred during the staking of games/information from
                  this platform. You are advised to stake according to your
                  financial capacity. (only gamble what you can afford to lose)
                </li>
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  Games and information presented here on this platform are
                  projected as 100% accurate but not guaranteed to be 100%
                  accurate until the final whistle is being blown (FT)
                </li>
              </ol>
            </li>
            <li className="mt-3">
              <h2 className="text-2xl font-semibold">Additional provision</h2>
              <ol className="list-decimal">
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  Updating our Terms
                  <br />
                  We work constantly to improve our services and develop new
                  features to make our Products better for you and our
                  community. As a result, we may need to update these Terms from
                  time to time to accurately reflect our services and practices.
                  We will only make any changes if the provisions are no longer
                  appropriate or if they are incomplete, and only if the changes
                  are reasonable and take due account of your interests.
                  <br />
                  We will notify you (for example, by email or through our
                  Products) at least 30 days before we make changes to these
                  Terms and give you an opportunity to review them before they
                  go into effect, unless changes are required by law. Once any
                  updated Terms are in effect, you will be bound by them if you
                  continue to use our Products.
                  <br />
                  We hope that you will continue using our Products, but if you
                  do not agree to our updated Terms and no longer want to be a
                  part of the Kingsports community, you can delete your account
                  at any time.
                </li>
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  Account suspension or termination
                  <br />
                  We want Kingsports Limited to be a place where people feel
                  welcome and safe to express themselves and share their
                  thoughts and ideas.
                  <br />
                  If we determine that you have clearly, seriously or repeatedly
                  breached our Terms or Policies, including in particular our
                  Community Standards, we may suspend or permanently disable
                  access to your account. We may also suspend or disable your
                  account if you repeatedly infringe other people’s intellectual
                  property rights or where we are required to do so for legal
                  reasons.
                  <br />
                  Where we take such action we’ll let you know and explain any
                  options you have to request a review, unless doing so may
                  expose us or others to legal liability; harm our community of
                  users; compromise or interfere with the integrity or operation
                  of any of our services, systems or Products; or where we are
                  restricted due to technical limitations; or where we are
                  prohibited from doing so for legal reasons.
                </li>
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  Limits on liability
                  <br />
                  We work hard to provide the best Products we can and to
                  specify clear guidelines for everyone who uses them. Our
                  Products, however, are provided "as is," and we make no
                  guarantees that they always will be safe, secure, or
                  error-free, or that they will function without disruptions,
                  delays, or imperfections. To the extent permitted by law, we
                  also DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED,
                  INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
                  FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. We do
                  not control or direct what people and others do or say, and we
                  are not responsible for their actions or conduct (whether
                  online or offline) or any content they share (including
                  offensive, inappropriate, obscene, unlawful, and other
                  objectionable content).
                  <br />
                  We cannot predict when issues might arise with our Products.
                  Accordingly, our liability shall be limited to the fullest
                  extent permitted by applicable law, and under no circumstance
                  will we be liable to you for any lost profits, revenues,
                  information, or data, or consequential, special, indirect,
                  exemplary, punitive, or incidental damages arising out of or
                  related to these Terms or the Kingsports Products, even if we
                  have been advised of the possibility of such damages.
                </li>
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  Disputes
                  <br />
                  We try to provide clear rules so that we can limit or
                  hopefully avoid disputes between you and us. If a dispute does
                  arise, however, it's useful to know up front where it can be
                  resolved and what laws will apply.
                  <br />
                  If you are a consumer, the laws of the country in which you
                  reside will apply to any claim, cause of action, or dispute
                  you have against us that arises out of or relates to these
                  Terms or the Kingsports Products, and you may resolve your
                  claim in any competent court in that country that has
                  jurisdiction over the claim. You also agree that you submit to
                  the personal jurisdiction of either of these courts for the
                  purpose of litigating any such claim, and that the laws of the
                  State of California will govern these Terms and any claim,
                  without regard to conflict of law provisions.
                </li>
                <li className="text-sm lg:text-base leading-relaxed font-normal mt-3">
                  Other
                  <ol className="list-decimal ml-2">
                    <li className="text-sm leading-relaxed font-normal mt-1">
                      These Terms (formerly known as the Statement of Rights and
                      Responsibilities) make up the entire agreement between you
                      and Kingsports Limited regarding your use of our Products.
                      They supersede any prior agreements.
                    </li>
                    <li className="text-sm leading-relaxed font-normal mt-1">
                      If any portion of these Terms is found to be
                      unenforceable, the remaining portion will remain in full
                      force and effect. If we fail to enforce any of these
                      Terms, it will not be considered a waiver. Any amendment
                      to or waiver of these Terms must be made in writing and
                      signed by us.
                    </li>
                    <li className="text-sm leading-relaxed font-normal mt-1">
                      You will not transfer any of your rights or obligations
                      under these Terms to anyone else without our consent.
                    </li>
                    <li className="text-sm leading-relaxed font-normal mt-1">
                      You may designate a person (called a legacy contact) to
                      manage your account if it is memorialized. Only your
                      legacy contact or a person who you have identified in a
                      valid will or similar document expressing clear consent to
                      disclose your content upon death or incapacity will be
                      able to seek disclosure from your account after it is
                      memorialized.
                    </li>
                    <li className="text-sm leading-relaxed font-normal mt-1">
                      You should know that we may need to change the username
                      for your account in certain circumstances (for example, if
                      someone else claims the username and it appears unrelated
                      to the name you use in everyday life). We will inform you
                      in advance if we have to do this and explain why.
                    </li>
                    <li className="text-sm leading-relaxed font-normal mt-1">
                      We always appreciate your feedback and other suggestions
                      about our products and services. But you should know that
                      we may use them without any restriction or obligation to
                      compensate you, and we are under no obligation to keep
                      them confidential.
                    </li>
                    <li className="text-sm leading-relaxed font-normal mt-1">
                      We reserve all rights not expressly granted to you.
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </section>
        <section className="mb-3">
          <h2 className="text-xl">Date of Last Revision: September 28, 2020</h2>
        </section>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
