import { useState } from 'react';
import './App.css';
import FormAmount from './Components.js/FormAmount';
import AmountLeft from './Components.js/AmountLeft';
import Deduct from './Components.js/Deduct';
import Record from './Components.js/Record';

function App() {
  const [formamount, setAmount] = useState(false)
  const [updateHistory, setUpdateHistory] = useState(false)
  return (
    <div className="App">
      <img src='https://www.clipartmax.com/png/full/36-365828_navbar-toggle-icon-menu-hamburger-png-white.png' style={{width:'40px', margin:'20px'}} onClick={()=>{setAmount(!formamount)}}></img>
      {formamount &&<FormAmount setAmount={setAmount}/>}
      {!formamount && <AmountLeft updateHistory={updateHistory}/>}
      {!formamount && <Deduct setUpdateHistory={setUpdateHistory} updateHistory={updateHistory}/>}
      {!formamount && <Record updateHistory={updateHistory}/>}
    </div>
  );
}

export default App;
