import React from 'react'

export default function Logs(props) {
 const allLogs=props.logs.map(prije=><p >{prije}</p>)
 
  return (
    <div className='logsBox'>
      <div className='logsTag'>Logs</div>
      <div className='logs okvir'>{allLogs}</div>
    </div>
  )
}
