import { useEffect, useState } from "react";
const URL = "https://app.debridge.finance/assets/scripts/widget.js"

const widgetData = {
    v: '1',
    element: 'debridgeWidget',
    title: '',
    description: '',
    width: '600',
    height: '800',
    r: null,
    supportedChains:
        '{"inputChains":{"1":"all","10":"all","56":"all","100":"all","137":"all","1890":"all","8453":"all","42161":"all","43114":"all","59144":"all","7565164":"all","245022934":"all"},"outputChains":{"1":"all","10":"all","56":"all","100":"all","137":"all","1890":"all","8453":"all","42161":"all","43114":"all","59144":"all","7565164":"all","245022934":"all"}}',
    inputChain: 56,
    outputChain: 1,
    inputCurrency: '',
    outputCurrency: '',
    address: '',
    showSwapTransfer: true,
    amount: '',
    outputAmount: '',
    isAmountFromNotModifiable: false,
    isAmountToNotModifiable: false,
    lang: 'en',
    mode: 'deswap',
    isEnableCalldata: false,
    styles:
        'eyJib3JkZXJSYWRpdXMiOjgsImZvbnRGYW1pbHkiOiIiLCJwcmltYXJ5QnRuQmciOiIiLCJzZWNvbmRhcnlCdG5CZyI6IiIsImxpZ2h0QnRuQmciOiIifQ==',
    theme: 'dark',
    isHideLogo: false,
    logo: '',
}

const loadScript = (src, callback) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
}

export const useBridgeHook = () => {
    const [scriptLoaded, setScriptLoaded] = useState(false)

    useEffect(() => {
        loadScript(URL, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            setScriptLoaded(true)
        });
    }, []);

    useEffect(() => {
        if (scriptLoaded && typeof window.deBridge?.widget === 'function') {
            window.deBridge.widget(widgetData)
        }
    }, [scriptLoaded])

    return window.deBridge
}