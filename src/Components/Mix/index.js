import React from 'react';
import {Line} from 'react-chartjs-2';
import { CountScans, getPromo, countScansByDate} from '../../services/admin'

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default class MixedChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      promotion: [],
      scansByProduct: [],
      productNames:[],
      dates:[]
    }
  }


async componentDidMount (){
  const { promo_id } = this.props
  const token = localStorage.getItem('authUserToken')
  try {
    const response = await getPromo(promo_id,token)
    const dataResponse = await response.json()
    this.setState({
      promotion: dataResponse.data.promotion.productInfo
    })
  } catch (error) {
    console.log('Error', error)
  }

  const listOfDates = ["2020-06-17","2020-06-18","2020-06-19","2020-06-20","2020-06-21","2020-06-22","2020-06-23","2020-06-24","2020-06-25"]
  const listOfNames =[]
  let matrix = []
  let productIndex = 0
  let dayIndex = 0
  await asyncForEach(this.state.promotion, async (producto) =>{
    matrix[productIndex]=[]
    await asyncForEach(listOfDates, async (day) =>{
      try {
        let response = await countScansByDate(promo_id,producto._id,day,token)
        let dataResponse = await response.json()
        // console.log(response,"escaneos")
        // console.log(promo_id,"promocion")
        // console.log(producto.productName,"producto")
        // console.log(producto._id,"producto")
        // console.log(day,"day")
        matrix[productIndex][dayIndex] = dataResponse.data.scans
      } catch (error) {
        
      }
      dayIndex++

    })
  listOfNames.push(producto.productName)
  dayIndex= 0
  productIndex++
  })
  this.setState({
    scansByProduct: matrix,
    dates: listOfDates,
    productNames: listOfNames
  })
}


  render() {

    const state = {
      labels: this.state.dates,
      datasets: [
        {
          backgroundColor: '#4374ED',
          borderColor: '4374ED',
          borderWidth: 2,
          label:'',
          data: []},
        {
          backgroundColor: '#9226C5',
          borderColor: '9226C5',
          borderWidth: 2,
          label:'',
          data: []
        },{
          backgroundColor: '#01625C',
          borderColor: '01625C',
          borderWidth: 2,
          label:'',
          data: []
        // },{
        //   label:'',
        //   data: []
        // },{
        //   label:'',
        //   data: []
        }]
    }
    let dataindex = 0
    console.log(this.state.scansByProduct)
    this.state.productNames.forEach(product => {
      state.datasets[dataindex].label = product
      state.datasets[dataindex].data = this.state.scansByProduct[dataindex]
      dataindex++
      console.log(product)     
      console.log(this.state.scansByProduct[dataindex])  
      console.log(dataindex)  
    });
    return (
      <div class="chart-container" >
      <div>
        <h1>
        </h1>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Escaneos por dia',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        >/</Line>
      </div>
      </div>
    );
  }
}
