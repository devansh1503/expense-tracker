import React, { useEffect, useState } from 'react'

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
      const daily = {}
      var date = ""
      var sum = 0
      var totalsum = 0
      history.forEach(element => {
        if(element.date !== date){
          daily[element.date] = sum
          totalsum += sum
          date = element.date
          sum = 0
        }
        sum += (+element.amount)
      })
      totalsum += sum
      daily[date] = sum
      setAvg(totalsum/Object.keys(daily).length)
    },[props.updateHistory])

    const outerStyle = {
      display:'flex',
      color:'white',
      marginTop:'15px'
    }
    const valueStyle = {
      marginLeft:'25px',
      color:'orange'
    }
  return (
    <div>
      <div style={outerStyle}>
        <h1>Most Common Expense-</h1>
        <h1 style={valueStyle}>Rs.{maxamt}</h1>
      </div>
      <div style={outerStyle}>
        <h1>Average Daily-</h1>
        <h1 style={valueStyle}>Rs.{avg}</h1>
      </div>
    </div>
  )
}

export default Report