import Header from '../../Components/Header'
import React from 'react';
import Dougnut from '../../Components/DougnutChart'
import Mixed from '../../Components/Mix'
import AreaParams from '../../Components/AreaChartParams'
import './Admin.scss'


export default class Admin extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <div className='row'>
          <div className='col-lg-6 col-md-12'>
            <div className="card ">
              <div id="dougnut">
              <Dougnut/>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-md-12'>
            <AreaParams/>
            <Mixed/>
          </div>
        </div>
      </div>
    );
  }
}