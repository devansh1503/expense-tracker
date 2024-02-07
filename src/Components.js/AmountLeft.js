import React, { useEffect, useState } from 'react'

function AmountLeft(props) {
    const [amt, setAmt] = useState(localStorage.getItem('amount'))
    useEffect(()=>{
        setAmt(localStorage.getItem('amount'))
    },[props.updateHistory])
  return (
    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <img src='https://cdn-icons-png.flaticon.com/512/217/217853.png' style={{width:'60px'}}></img>
        <h1 style={{fontSize:'60px', color:'white'}}>{amt}</h1>
    </div>
  )
}

export default AmountLeft