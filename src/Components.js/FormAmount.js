import React, { useRef } from 'react'

function FormAmount(props) {
    const inpStyle = {
        width:'90%',
        background:'none',
        border:'none',
        fontSize:'25px',
        margin:'20px',
        borderBottom:'1px solid #3f5efb',
        color:'white'
    }
    const btn = {
        width:'80%',
        fontSize:'25px',
        margin:'20px',
        fontWeight:'600',
        color:'white',
        backgroundImage:'linear-gradient(to right, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
        border:'none',
        padding: '10px',
    }
    const amt = useRef();
    const time = useRef();
    const onClick = () =>{
        if(!amt.current.value) return;
        localStorage.setItem('amount', +amt.current.value)
        localStorage.setItem('start_amount', +amt.current.value)
        localStorage.setItem('time', +time.current.value)
        localStorage.setItem('start_timestamp', Date.now())
        localStorage.removeItem('history')
        props.setAmount(false)
    }
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100vw'}}>
        <h1 style={{color:'white', fontSize:'30px', borderBottom:'1px solid #3f5efb'}}>Enter Your Expense</h1>
        <input ref={amt} style={inpStyle} placeholder='Enter Your Expense'></input>
        <input ref={time} style={inpStyle} placeholder='Enter Number of Days'></input>
        <button style={btn} onClick={onClick}>Update</button>
    </div>
  )
}

export default FormAmount