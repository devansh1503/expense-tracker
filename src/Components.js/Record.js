import React, { useEffect, useState } from 'react'

function Record(props) {
    const historyStyle = {
        display:'flex',
        flexDirection:'column',
        fontSize:'17px',
        color:'white',
        marginLeft:'5px',
        fontWeight:'600'
    }
    const [his, setHis] = useState(JSON.parse(localStorage.getItem('history')))
    useEffect(()=>{
        setHis(JSON.parse(localStorage.getItem('history')))
    },[props.updateHistory])
  return (
    <div style={{margin:'30px'}}>
        <h1 style={{fontSize:'30px', color:'white'}}>History</h1>
        {his ? his.slice(his.length-4, his.length).map((item)=>{
            return <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', backgroundColor:'#4308E5', alignItems:'center', padding:'10px', marginTop:'10px'}}>
                {/* <img src='https://static.vecteezy.com/system/resources/previews/009/267/401/original/minus-sign-icon-free-png.png' 
                style={{width:'40px', height:'40px'}}></img> */}
                <div style={historyStyle}>
                    <div>Rs.{item.amount}</div>
                    <div style={{color:'#fc466b'}}>{item.reason}</div>
                </div>
                <div style={{fontSize:'20px', color:'white'}}>{item.date}</div>
            </div>
        }): <div/>}
    </div>
  )
}

export default Record
