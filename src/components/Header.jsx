import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { AlbusSecurity } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";

// 1. Import the wagmi hooks
import { useConnect, useAccount } from "wagmi";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  // 2. Get data from wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  // 3. Updated Wallet Handler
  // This function now looks for the generic "injected" connector
  const handleConnectWallet = () => {
    // Look for the 'injected' connector (supports MetaMask, Brave, etc.)
    const injectedConnector = connectors.find(
      (connector) => connector.id === "injected"
    );

    if (injectedConnector) {
      connect({ connector: injectedConnector });
    } else {
      alert("No browser wallet found. Please install a wallet like MetaMask.");
    }
  };

  // 4. Helper function to shorten the wallet address
  const truncateAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  // 5. Full JSX for the component
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={AlbusSecurity} width={190} height={40} alt="AlbusSecurity" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg:transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {/* 6. This is the updated button logic */}
        {isConnected ? (
          // If connected, show the truncated address
          <Button className="hidden lg:flex">
            {truncateAddress(address)}
          </Button>
        ) : (
          // If not connected, show the connect button
          <Button
            className="hidden lg:flex"
            onClick={handleConnectWallet} // Calls our updated function
          >
            Connect Wallet
          </Button>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;