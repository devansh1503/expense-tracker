import React, { useRef } from 'react'

function Deduct(props) {
    const inpStyle = {
        width:'90%',
        background:'none',
        border:'none',
        fontSize:'25px',
        margin:'20px',
        borderBottom:'1px solid orange',
        color:'white'
    }
    const btn = {
        width:'80%',
        fontSize:'25px',
        margin:'20px',
        backgroundColor:'orange',
        border:'none',
        padding: '10px',
    }
    const amt = useRef();
    const reason = useRef();
    const onClick = () =>{
        var his = localStorage.getItem('history')!==null ? JSON.parse(localStorage.getItem('history')) : []
        his.push({'amount': +amt.current.value, 'reason': reason.current.value})
        localStorage.setItem('history', JSON.stringify(his))
        localStorage.setItem('amount', +localStorage.getItem('amount')-amt.current.value)
        props.setUpdateHistory(!props.updateHistory)
    }
  return (
    <div style={{display:'flex', flexDirection:'column', width:'90vw'}}>
        <input ref={amt} style={inpStyle} placeholder='Enter Your Expense'></input>
        <input ref={reason} style={inpStyle} placeholder='Enter Reason'></input>
        <button style={btn} onClick={onClick}>Deduct</button>
    </div>
  )
}

export default Deduct