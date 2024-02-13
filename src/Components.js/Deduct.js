import React, { useRef } from 'react'

function Deduct(props) {
    const inpStyle = {
        width:'90%',
        background:'none',
        border:'none',
        fontSize:'20px',
        margin:'20px',
        borderBottom:'1px solid #3f5efb',
        color:'white'
    }
    const btn = {
        fontSize:'20px',
        fontWeight:'600',
        width:'fit-content',
        margin:'20px',
        color:'white',
        backgroundImage:'linear-gradient(to right, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
        border:'none',
        padding: '10px',
        paddingLeft:'20px',
        paddingRight:'20px'
    }
    const amt = useRef();
    const reason = useRef();
    const onClick = () =>{
        if(!amt.current.value || !reason.current.value) return;
        var his = localStorage.getItem('history')!==null ? JSON.parse(localStorage.getItem('history')) : []
        const currentDate = new Date()
        his.push({'amount': +amt.current.value, 'reason': reason.current.value, 'date': `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`})
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