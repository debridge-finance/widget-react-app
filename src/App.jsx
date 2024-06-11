
import './App.css'
import { useBridgeHook } from './useBridge';

function App() {
  useBridgeHook()

  return (
    <>
      <div id="debridgeWidget" />
    </>
  );
}

export default App
