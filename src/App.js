import React from 'react'
// import logo from './scanhere.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// css
import 'bootstrap/dist/css/bootstrap.min.css'
// import Login from './Components/Login'
import Home from './pages/Home'
import Login from './pages/Login'
import Graphics from './pages/Graphics'
import PagePromoList from './pages/Promo-List'
import QrGenerator from './pages/QrGenerator'
import PromoForm from './pages/PromoForm'
import ProductForm from './pages/ProductForm'
import Landing from './pages/LandingPage'
import SignIn from './pages/SignIn'
import Promos from './pages/Promos'
import AlbumQr from './pages/Album-QR'
import ScanQr from './pages/scaner-Qr'
import RedirectQr from './pages/redirect-qr'

function App () {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/promo-list'>
            <PagePromoList />
          </Route>
          <Route exact path='/graphics/:id' render={(props) => <Graphics {...props} />} />
          <Route exact path='/qrGenerator'>
            <QrGenerator />
          </Route>
          <Route exact path='/promo-form'>
            <PromoForm />
          </Route>
          <Route exact path='/product-form'>
            <ProductForm />
          </Route>
          <Route exact path='/signin'>
            <SignIn />
          </Route>
          <Route exact path='/promos'>
            <Promos />
          </Route>
          <Route exact path='/album-qr/:promotionId' component={AlbumQr} />
          <Route exact path='/album-qr/:promotionId/scan-qr' component={ScanQr} />
          <Route exact path='/qr/:qrhash' component={RedirectQr} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
