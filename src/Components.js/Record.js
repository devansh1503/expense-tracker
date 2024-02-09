import React, { useEffect, useState } from 'react'

function Record(props) {
    const historyStyle = {
        display:'flex',
        flexDirection:'column',
        fontSize:'20px',
        color:'white',
        marginLeft:'30px'
    }
    const [his, setHis] = useState(JSON.parse(localStorage.getItem('history')))
    useEffect(()=>{
        setHis(JSON.parse(localStorage.getItem('history')))
    },[props.updateHistory])
  return (
    <div style={{margin:'30px'}}>
        <h1 style={{fontSize:'30px', color:'white'}}>History</h1>
        {his ? his.slice(his.length-4, his.length).map((item)=>{
            return <div style={{display:'flex', backgroundColor:'green', alignItems:'center', padding:'10px', margin:'10px'}}>
                <img src='https://static.vecteezy.com/system/resources/previews/009/267/401/original/minus-sign-icon-free-png.png' 
                style={{width:'40px', height:'40px'}}></img>
                <div style={historyStyle}>
                    <div>Rs.{item.amount}</div>
                    <div>{item.reason}</div>
                </div>
            </div>
        }): <div/>}
    </div>
  )
}

export default Record