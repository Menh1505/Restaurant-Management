import React from 'react';
import './App.css';
import Navigation from './Navigation/Navigation'
import Footer from './Footer/footer'

//PAGES
import Admin from './PAGES/Admin'
import Menu from './PAGES/menu'
import Customerhome from './PAGES/custormer'
import Staffhome from './PAGES/staff'
import Revenue from './PAGES/revenus'
import Bookingtable from './PAGES/booking'

import AdditionDishes from './PAGES/add'
import Deletions from './PAGES/dele'
import ConfirmDishes from './PAGES/comfirm'
import TableDishes from './PAGES/tableDishes'
import Login from './PAGES/Login';

function App() {
  return (
    <div>
      <Navigation />
      <Menu />
      <Customerhome />
      <Deletions />
      <ConfirmDishes />
      <Admin />
      <Revenue />
      <AdditionDishes />
      <Bookingtable />
      <TableDishes />
      <Login />
      <Footer />

    </div>

  );
}


export default App;

