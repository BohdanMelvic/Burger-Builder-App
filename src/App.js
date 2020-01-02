import React from 'react';
import './App.scss';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder/>
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
