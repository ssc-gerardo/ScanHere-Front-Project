// import React, { Component, useState,useEffect } from 'react'
// import {Line} from 'react-chartjs-2'

// const Dankmemes = () => {
//   const [chartData, setChartData] = useState({})

//   const chart = () => {
//     setChartData({
//       labels: ['lunes','martes', ' miercoles','jueves', 'viernes'],
//       datasets:[
//         {
//           label: 'nivel de anchura',
//           data: [32,23,45,45,67 ],
//           backgroundColor: [
//             'rba(75,192,192,0.6)'
//           ],
//           borderWidth: 4
//         }
//       ]
//     })
//   }

//   useEffect(() => {
//     chart()
//   }, [])

//   return(
//     <div className="App">
//       <h1>
//         Dankmemes
//       </h1>
//       <div>
//         <Line data={chartData}/>
//       </div>
//     </div>
//   )
// }

// export default Dankmemes


// import React from 'react';
// import {Bar} from 'react-chartjs-2';

// const state = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'Rainfall',
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56]
//     }
//   ]
// }

// export default class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Bar
//           data={state}
//           options={{
//             title:{
//               display:true,
//               text:'Average Rainfall per month',
//               fontSize:20
//             },
//             legend:{
//               display:true,
//               position:'right'
//             }
//           }}
//         />
//       </div>
//     );
//   }
// }