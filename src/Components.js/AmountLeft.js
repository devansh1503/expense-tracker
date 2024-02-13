import React, { useEffect, useState } from 'react'

function AmountLeft(props) {
    const [amt, setAmt] = useState(localStorage.getItem('amount'))
    useEffect(()=>{
        setAmt(localStorage.getItem('amount'))
    },[props.updateHistory])
  return (
    <div style={{width:'100%',display:'flex', alignItems:'center', marginLeft:'30px'}}>
        <img src='https://cdn3.iconfinder.com/data/icons/pretty-office-part-11-reflection-style/512/cash.png' style={{width:'40px'}}></img>
        <h1 style={{fontSize:'40px', color:'white'}}>{amt}</h1>
    </div>
  )
}

export default AmountLeft