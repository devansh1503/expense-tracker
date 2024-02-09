import { useEffect, useState } from 'react';
import './App.css';
import FormAmount from './Components.js/FormAmount';
import AmountLeft from './Components.js/AmountLeft';
import Deduct from './Components.js/Deduct';
import Record from './Components.js/Record';
import Report from './Components.js/Report';

function App() {
  const [formamount, setAmount] = useState(false)
  const [updateHistory, setUpdateHistory] = useState(false)
  useEffect(()=>{
    var history = JSON.parse(localStorage.getItem('history'))
    var his = []
    history.forEach(element => {
      if(history.indexOf(element)<5)
        element['date']="8/2/2024"
      else
        element['date']="9/2/2024"
      his.push(element)
    });
    localStorage.setItem('history', JSON.stringify(his))
  },[])
  return (
    <div className="App">
      <img src='https://www.clipartmax.com/png/full/36-365828_navbar-toggle-icon-menu-hamburger-png-white.png' style={{width:'40px', margin:'20px'}} onClick={()=>{setAmount(!formamount)}}></img>
      {formamount &&<FormAmount setAmount={setAmount}/>}
      {!formamount && <AmountLeft updateHistory={updateHistory}/>}
      {!formamount && <Deduct setUpdateHistory={setUpdateHistory} updateHistory={updateHistory}/>}
      {!formamount && <Record updateHistory={updateHistory}/>}
      {/* {!formamount && <Report updateHistory={updateHistory}/>} */}
    </div>
  );
}

export default App;
