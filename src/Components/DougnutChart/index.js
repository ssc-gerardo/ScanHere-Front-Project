import React from 'react';
import { Doughnut} from 'react-chartjs-2';
import { CountScans, getPromo} from '../../services/admin'

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default class DoughnutChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      promotion: [],
      productsScans: [],
      productNames:[],
      scans:[]
    }
  }


  async componentDidMount () {
    const { promo_id } = this.props
    try {
      const token = localStorage.getItem('authUserToken')
      const response = await getPromo(promo_id,token)
      const dataResponse = await response.json()
      this.setState({
        promotion: dataResponse.data.promotion.productInfo
      })
    } catch (error) {
      console.log('Error', error)
    }
    const listOfScans=[]
    const listOfNames=[]
    await asyncForEach(this.state.promotion, async (element) => {
      try {
        const token = localStorage.getItem('authUserToken')
        const response = await CountScans(element._id,promo_id,token)
        const dataResponse = await response.json()
        listOfScans.push(dataResponse.data.scans)
        listOfNames.push(element.productName)
      } catch (error) {
        console.log('Error', error)
      }
    })
    this.setState({
      scans: listOfScans,
      productNames: listOfNames
    })
  }

  render() {
    const state = {
      fontColor: 'white',
      labels: this.state.productNames,
      datasets: [
        {
          fontColor: 'white',
          label: 'Productos',
          backgroundColor: [
            '#4374ED',
            '#9226C5',
            '#0C8B28',
          ],
          hoverBackgroundColor: [
          '#1843AC',
          '#3D0A55',
          '#084115',
          ],
          data: this.state.scans
        }
      ]
    }
    return (
      <div>
        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Escaneos por producto',
              fontSize:25,
              // fontColor: 'white',
            },
            legend:{
              fontSize:20,
              display:true,
              position:'left',
              
            }
          }}
        />
      </div>
    );
  }
}