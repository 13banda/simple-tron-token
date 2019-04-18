import React, { Component } from 'react';
import logo from './../../logo.svg';
import './index.css';
import Utils from './../../utils'
import TronLinkGuide from './../TronLinkGuide';
import TronWeb from 'tronweb'
import moment from 'moment'
const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

class App extends Component {
  state = {
    tronWeb :{
      installed: false,
      loggedIn : false,
    },
    storageData:0
  }

  async componentDidMount () {
      // do here after component mount
    await new Promise((resolve, reject) =>{
      const tronWebState = {
          installed: !!window.tronWeb,
          loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if(tronWebState.installed) {
          this.setState({
              tronWeb:
              tronWebState
          });

          return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
          if(tries >= 10) {
              const TRONGRID_API = 'https://api.trongrid.io';

              window.tronWeb = new TronWeb(
                  TRONGRID_API,
                  TRONGRID_API,
                  TRONGRID_API
              );

              this.setState({
                  tronWeb: {
                      installed: false,
                      loggedIn: false
                  }
              });

              clearInterval(timer);
              return resolve();
          }

          tronWebState.installed = !!window.tronWeb;
          tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

          if(!tronWebState.installed)
              return tries++;

          this.setState({
              tronWeb: tronWebState
          });

          resolve();
        }, 100);

      });
      if(!this.state.tronWeb.loggedIn) {
          // Set default address (foundation address) used for contract calls
          // Directly overwrites the address object as TronLink disabled the
          // function call
          window.tronWeb.defaultAddress = {
              hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
              base58: FOUNDATION_ADDRESS
          };

          window.tronWeb.on('addressChanged', () => {
              if(this.state.tronWeb.loggedIn)
                  return;

              this.setState({
                  tronWeb: {
                      installed: true,
                      loggedIn: true
                  }
              });
          });
      }

      await Utils.setTronWeb(window.tronWeb)
    //  this.startUpdateListner()
//      await this.fetchData();
  //  await  this.createToken()
  Utils.contract.transfer(Utils.tronWeb.address, 100).send({
       shouldPollResponse: true,
       callValue: 0
   }).then(res => alert('done')).catch(err => console.log(err));

    }

    createToken = async () => {
      console.log(moment().format());
     const TOKEN_OPTIONS = {
      name : "shark",
      abbreviation : "shark",
      description : "this is simple test token for shark world",
      url : "https://www.shark.world",
      totalSupply : "100000",
      trxRatio : 10, // How much TRX will tokenRatio cost?
      tokenRatio : 1, // How many tokens will trxRatio afford?
      saleStart : 1,
      saleEnd : 1,
      freeBandwidth : 1, // The creator's "donated" bandwidth for use by token holders
      freeBandwidthLimit : 1, // Out of totalFreeBandwidth, the amount each token holder get
      frozenAmount : 0,
      frozenDuration : 0
     }
     console.log("create token");
     let c = await Utils.tronWeb.transactionBuilder.createToken(TOKEN_OPTIONS,Utils.tronWeb.defaultAddress.hex)
     console.log(c);
   }

   fetchData =  async () => {
     const storageData = (await Utils.contract.get().call()).toNumber();
      this.setState({storageData:storageData})
    }

    setData = async () =>{
      let storageData = this.state.storageData;
      storageData++;
      Utils.contract.set(storageData).send({
        shouldPollResponse: true,
        callValue:10,
      })
      .then(result => {
        console.log(result);
      })
      .catch((err) => {
        console.log('Something went wrong',err);
      })
    }
    startUpdateListner = () => {
      Utils.contract.Update().watch((err, d) => {
          if(err)
              return console.error('Failed to bind event listener:', err);
              console.log(d);
          if(d.result.data)
          this.setState({storageData:d.result.data})
      });
    }
  render() {
    const { tronWeb:{ installed, loggedIn }, storageData } = this.state;
    if(!installed)
      return <TronLinkGuide/>
    if(!loggedIn)
      return <TronLinkGuide loggedIn />

    return (
      <div className="App">
        <header className="App-header">
          Sample
          <button onClick={this.setData}>Set Data</button>
          <pre>set : { storageData }</pre>
        </header>
      </div>
    );
  }
}

export default App;
