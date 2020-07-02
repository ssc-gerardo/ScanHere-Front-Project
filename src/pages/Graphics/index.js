import Header from '../../Components/Header'
import React from 'react';
import Dougnut from '../../Components/DougnutChart'
import Mixed from '../../Components/Mix'
import AreaParams from '../../Components/AreaChartParams'
import './Admin.scss'
import NavBarAdmin from '../../Components/NavBarAdmin'


export default class Admin extends React.Component {

  render() {
    const { id } = this.props.match.params
    return (  
        <div className="container">
          <Header/>
          <div className="row">
            <div className="col-12 ">
              <div id="dougnut">
              <Dougnut promo_id={id}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className='col-12'>
                <AreaParams />
                <div className="graphContainer">
                <Mixed promo_id={id}/>
                </div>
              </div>
          </div>
        <NavBarAdmin/>
        </div>
    );
  }
}