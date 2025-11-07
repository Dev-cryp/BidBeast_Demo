import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Marquee from "react-fast-marquee";
import { curve, nft1, nft2, nft3, nft4, nft5 } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef, useState, useEffect } from "react";
import Notification from "./Notification";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { particlesConfig } from "../particles-config";

const nftImages = [nft1, nft2, nft3, nft4, nft5];
const mockBids = [
  {
    id: 1,
    nftImg: nft1,
    name: "Cyber Ape #302",
    price: "1.45 ETH",
    bidderImg: nft5,
  },
  {
    id: 2,
    nftImg: nft2,
    name: "Future Punk #112",
    price: "0.88 ETH",
    bidderImg: nft4,
  },
  {
    id: 3,
    nftImg: nft3,
    name: "Robo-Beast #7",
    price: "2.10 ETH",
    bidderImg: nft3,
  },
  {
    id: 4,
    nftImg: nft4,
    name: "Meta-Soldier #98",
    price: "0.55 ETH",
    bidderImg: nft2,
  },
  {
    id: 5,
    nftImg: nft5,
    name: "Astro Chimp #42",
    price: "1.99 ETH",
    bidderImg: nft1,
  },
];
const BidCard = ({ nftImg, name, price, bidderImg }) => (
  // ... (your BidCard component) ...
  <div className="relative flex items-center w-[20rem] h-[6rem] p-3 bg-n-8/90 border border-n-1/10 rounded-2xl mx-4 backdrop-blur-md overflow-hidden">
    <div className="relative w-20 h-20 -my-3 -ml-1">
      <img
        src={nftImg}
        className="object-cover w-full h-full rounded-lg"
        alt={name}
      />
    </div>
    <div className="flex-1 ml-3">
      <h6 className="font-grotesk text-sm font-semibold text-n-1 mb-0.5">
        {name}
      </h6>
      <div className="flex items-center justify-between">
        <span className="text-color-4 text-xs font-code font-bold">
          {price}
        </span>
        <div className="flex items-center">
          <span className="text-n-3 text-xs mr-1">Top Bid:</span>
          <img
            src={bidderImg}
            className="w-5 h-5 rounded-full ring-1 ring-n-6"
            alt="Bidder"
          />
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const parallaxRef = useRef(null);

  // --- YOUR IMAGE CYCLING STATE ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % nftImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);
  // ------------------------------------------

  // --- 2. Create the init function for tsParticles ---
  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // You can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // This loads the tsparticles-slim bundle
    await loadSlim(engine);
  }, []);

  return (
    <Section
      // --- 3. Add 'relative' to make this the positioning parent ---
      className="relative pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      {/* --- 4. Add the Particles component --- */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        // This positions it in the background
        className="absolute inset-0 z-0"
      />

      {/* Your existing content is now z-1 by default, so it sits on top */}
      <div className="container relative" ref={parallaxRef}>
        <motion.div
          className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* --- RESTORED BIDBEAST CONTENT --- */}
          <h1 className="h2 mb-6 font-grotesk">
            <TypeAnimation
              sequence={[
                1000,
                "Welcome to the BidBeast Exchange",
                2500,
                "Turn Your Bids into Yield on",
                2500,
                "Secure Exclusive NFT Drops on",
                2500,
                "Win Auctions. Earn Interest. Only on",
                2500,
              ]}
              wrapper="span"
              speed={120} // Slow speed
              deletionSpeed={120} // Slow speed
              repeat={Infinity}
              className="inline-block"
            />
            {` `}
            <span className="inline-block relative">
              BidBeast NFT{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            The revolutionary NFT marketplace. Get exclusive NFT
            distributions, list them for auction, and watch the bids roll in.
            Bidders earn interest on their deposited funds, making every bid a
            smart move.
          </p>
          <Button href="#" white>
            Comming Soon
          </Button>
        </motion.div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          {/* --- 5. Add 'z-1' to ensure this is above particles --- */}
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                {/* --- YOUR DYNAMIC IMAGE --- */}
                <img
                  src={nftImages[currentImageIndex]}
                  key={currentImageIndex}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt={`BidBeast NFT ${currentImageIndex + 1}`}
                />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={icon} />
                      </li>
))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Code generation"
                  />
                </ScrollParallax>
              </div>
            </div>

            <Gradient />
          </div>

          {/* Earth/Orbit removed */}
        </div>

        {/* --- REPLACED CompanyLogos WITH MARQUEE --- */}
        <div className="hidden relative z-10 mt-20 lg:block">
          <h5 className="tagline mb-6 text-center text-n-1/50">
            LIVE BIDS ON BIDBEAST
          </h5>
          <Marquee gradient={false} speed={40} pauseOnHover={true}>
            {mockBids.map((bid) => (
              <BidCard key={bid.id} {...bid} />
            ))}
          </Marquee>
        </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default Hero;