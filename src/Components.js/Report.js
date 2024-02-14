import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

function ExportToExcel({data, data2, fileName, btnText}){
  const exportToExcel = () =>{
    const ws = XLSX.utils.json_to_sheet(data);
    const ws2 = XLSX.utils.json_to_sheet(data2);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "History");
    XLSX.utils.book_append_sheet(wb, ws2, "Daily Expense");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' })

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName + '.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  };
  const btnStyle = {
    fontSize:'20px',
    backgroundImage:'linear-gradient(to right, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
    color:'white',
    border:'none',
    padding:'15px',
    borderRadius:'25px'
  }
  return (
    <div>
      <button style={btnStyle} onClick={exportToExcel}>
        {btnText}
      </button>
    </div>
  )
}

function Stats(props){
    const [avg, setAvg] = useState()
    const [daysLeft, setDaysLeft] = useState(0)

    useEffect(()=>{
      const curr = new Date()
      const start = new Date(+localStorage.getItem('start_timestamp')) //start_timestamp can't be Date object, because in cache it will be stored as a string
      curr.setHours(0,0,0,0)
      start.setHours(0,0,0,0)
      const diff = curr.getTime() - start.getTime()
      const days = Math.floor(diff/(1000*60*60*24))
      setDaysLeft(days)
    },[])

    useEffect(()=>{
      const history = JSON.parse(localStorage.getItem('history'))
      if(!history) return
      const daily = []
      var date = ""
      var sum = 0
      var totalsum = 0
      history.forEach(element => {
        if(element.date !== date){
          daily.push({"date":date, "amount":sum})
          totalsum += sum
          date = element.date
          sum = 0
        }
        sum += (+element.amount)
      })
      totalsum += sum
      daily.push({"date":date, "amount":sum})
      setAvg(totalsum/(daily.length-1))
    },[props.updateHistory])

    const outerStyle = {
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      color:'white',
      marginBottom:'25px',
      fontSize:'20px',
      fontWeight:'600',
      width:'100%'
    }
    const valueStyle = {
      marginLeft:'25px',
      color:'rgba(131,58,180,1)'
    }
    const mainStyle = {
      position:'fixed',
      top:'20%',
      left:'10%',
      width:'80%',
      padding:"20px",
      borderRadius:'20px',
      backgroundImage:'linear-gradient(to right, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
      boxShadow: '10px 10px 20px black'

    }
  return (
    <div style={mainStyle}>
      <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
        <img src='https://static.vecteezy.com/system/resources/previews/017/178/078/original/cross-check-symbol-on-transparent-background-free-png.png' style={{width:'25px', marginBottom:'5px'}} onClick={()=>{props.setStats(false)}}></img>
      </div>
      <div style={outerStyle}>
        <p>Average Daily-</p>
        <p style={valueStyle}>Rs.{Math.round(avg)}</p>
      </div>
      <div style={outerStyle}>
        <p>Predicted Expense Monthly-</p>
        <p style={valueStyle}>Rs.{Math.round(Math.round(avg)*+(localStorage.getItem('time')))}</p>
      </div>
      <div style={outerStyle}>
        <p>Predicted Expense For Remaining Days-</p>
        <p style={valueStyle}>Rs.{Math.round(Math.round(avg)*(+localStorage.getItem('time')-daysLeft))}</p>
      </div>
      <div style={outerStyle}>
        <p>Predicted Savings-</p>
        <p style={valueStyle}>Rs.{Math.round((+localStorage.getItem('start_amount')) - Math.round(avg)*+(localStorage.getItem('time')))}</p>
      </div>
    </div>
  )
}

function Report(props) {
    const [data, setData] = useState([])
    const [stats, setStats] = useState(false)
    useEffect(()=>{
      const history = JSON.parse(localStorage.getItem('history'))
      if(!history) return
      const daily = []
      var date = ""
      var sum = 0
      var totalsum = 0
      history.forEach(element => {
        if(element.date !== date){
          daily.push({"date":date, "amount":sum})
          totalsum += sum
          date = element.date
          sum = 0
        }
        sum += (+element.amount)
      })
      totalsum += sum
      daily.push({"date":date, "amount":sum})
      setData(daily)
    },[props.updateHistory])

    const btnStyle = {
      fontSize:'20px',
      backgroundImage:'linear-gradient(to right, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
      color:'white',
      border:'none',
      padding:'15px',
      borderRadius:'25px',
      marginBottom:'25px'
    }
  return (
    <div style={{margin:'30px'}}>
      
      <div style={{marginTop:'25px'}}>
        {stats && <Stats setStats={setStats}/>}
        <button style={btnStyle} onClick={()=>{setStats(true)}}>Show Stats</button>
        <ExportToExcel data={JSON.parse(localStorage.getItem('history'))} data2={data} fileName="history_of_expenses" btnText="Download History"/>
      </div>
    </div>
  )
}

export default Report
