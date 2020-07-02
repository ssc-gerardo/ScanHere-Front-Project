import React from 'react';
import './AreaParams.scss'
import Moment from 'react-moment';

export default class AreaParams extends React.Component {

  render() {
    const date = new Date();
    const numeroDeDias = 0
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
      
    // }
    return (
      <div>
        <div className="row">
          {/* <div className="col-3">
            <h5>Escaneos por dia</h5>
          </div>
          <div className="col-1">
            <h6>Dias:</h6>
          </div> */}
          {/* <div><Moment format="YYYY-MM-DD">
                {date}
            </Moment>

            </div> */}
          {/* <div className="col-1">
            <select className="form-control form-control-sm" id="selectOptios">
              <option value="0">10</option>
                <option value="1">9</option>
                <option value="2">8</option>
                <option value="3">7</option>
                <option value="4">6</option>
                <option value="5">5</option>
                <option value="6">4</option>
                <option value="7">3</option>
                <option value="8">2</option>
            </select>
          </div> */}
          {/* <div className="col-1">
            <h6>Inicio</h6>
          </div> */}
          {/* <div className="col-1">
          <input className="form-control form-control-sm" type="text" placeholder="dd" id="inicioD"/>
          </div> */}
          {/* <div className="col-1">
            <input type="text" />
          </div> */}
          {/* <div className="col-1">

          </div> */}
        </div>
      </div>
    );
  }
}


