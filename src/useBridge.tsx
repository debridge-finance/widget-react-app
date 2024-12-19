// Define a global type for the Debridge window object
declare global {
    interface Window {
        deBridge?: {
            widget(data: typeof widgetData): void;
        };
    }
}

import { useEffect, useState } from "react";

const URL = "https://app.debridge.finance/assets/scripts/widget.js";

const widgetData = {
    v: "1",
    element: "debridgeWidget",
    title: "",
    description: "",
    width: "600",
    height: "800",
    r: null,
    supportedChains:
        '{"inputChains":{"1":"all","10":"all","56":"all","100":"all","137":"all","1088":"all","1890":"all","7171":"all","8453":"all","42161":"all","43114":"all","59144":"all","7565164":"all","245022934":"all"},"outputChains":{"1":"all","10":"all","56":"all","100":"all","137":"all","1088":"all","1890":"all","7171":"all","8453":"all","42161":"all","43114":"all","59144":"all","7565164":"all","245022934":"all"}}',
    inputChain: 8453,
    outputChain: 1,
    inputCurrency: "",
    outputCurrency: "",
    address: "",
    showSwapTransfer: true,
    amount: "",
    outputAmount: "",
    isAmountFromNotModifiable: false,
    isAmountToNotModifiable: false,
    lang: "en",
    mode: "deswap",
    isEnableCalldata: false,
    styles:
        "eyJhcHBCYWNrZ3JvdW5kIjoiIzE2MTgyMiIsInByaW1hcnlCdG5CZyI6IiMxZDRlZDgiLCJwcmltYXJ5QnRuVGV4dCI6IiNmZmZmZmYiLCJidG5QYWRkaW5nIjp7InRvcCI6bnVsbCwicmlnaHQiOm51bGwsImJvdHRvbSI6bnVsbCwibGVmdCI6bnVsbH19",
    theme: "dark",
    isHideLogo: false,
    logo: "",
    disabledWallets: [],
    disabledElements: [],
};

const loadScript = (src: string, callback: (error?: Error, script?: HTMLScriptElement) => void) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => callback(undefined, script);
    script.onerror = () => callback(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
};

export const useBridgeHook = (): typeof window.deBridge | undefined => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        loadScript(URL, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            setScriptLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (scriptLoaded && typeof window?.deBridge?.widget === "function") {
            window?.deBridge.widget(widgetData);
        }
    }, [scriptLoaded]);


    if (typeof window !== "undefined") {

        return window.deBridge
    }


};