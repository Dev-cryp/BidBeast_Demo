import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { WagmiProvider, createConfig } from "wagmi";
import { mainnet, polygon, arbitrum } from "wagmi/chains";
import { http } from "viem";

// --- 1. CHANGE THIS IMPORT ---
// Import 'injected' instead of (or in addition to) 'metaMask'
import { injected } from "wagmi/connectors";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const wagmiChains = [mainnet, polygon, arbitrum];

const config = createConfig({
  chains: wagmiChains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [
    // --- 2. CHANGE THIS LINE ---
    injected(), // Use the generic 'injected' connector
  ],
  autoConnect: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);