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
    fontSize:'25px',
    background:'#4308E5',
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

function Report(props) {
    const [data, setData] = useState([])
    const [maxamt, setMaxamt] = useState()
    const [avg, setAvg] = useState()
    useEffect(()=>{
      const history = JSON.parse(localStorage.getItem('history'))
      if(!history) return
      const frequency = {}
      var max = -1 * Math.min()
      var max_amount = 0
      history.forEach(element => {
        frequency[element.amount] = frequency[element.amount]?frequency[element.amount]+1:1
        if(max < frequency[element.amount]){
          max = frequency[element.amount]
          max_amount = element.amount
        }
      });
      setMaxamt(max_amount)
    },[props.updateHistory])

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
      setAvg(totalsum/daily.length)
    },[props.updateHistory])

    const outerStyle = {
      display:'flex',
      color:'white',
      marginTop:'15px',
      justifyContent:'center',
      alignItems:'center'
    }
    const valueStyle = {
      marginLeft:'25px',
      color:'orange'
    }
  return (
    <div style={{margin:'30px'}}>
      <div style={outerStyle}>
        <h1>Most Common Expense-</h1>
        <h1 style={valueStyle}>Rs.{maxamt}</h1>
      </div>
      <div style={outerStyle}>
        <h1>Average Daily-</h1>
        <h1 style={valueStyle}>Rs.{Math.round(avg)}</h1>
      </div>
      <div style={{marginTop:'25px'}}>
        <ExportToExcel data={JSON.parse(localStorage.getItem('history'))} data2={data} fileName="history_of_expenses" btnText="Download History"/>
      </div>
    </div>
  )
}

export default Report