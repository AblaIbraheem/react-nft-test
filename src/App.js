import React from 'react';

import logo from './logo.svg';

import './App.css';
import { getUserNFTs } from './contract/api/nftUtils';
import { getNFTsOwned } from './api/userInfo';

//import { cep47 } from './contract/contract/cep47';
import { cep47 } from './lib/cep47';
function App() {
  React.useEffect(()=>{
  //  constole.log(hi)

  },[])
  const akram = async()=>{
    const name = await cep47.name()
    console.log(name , "Contract Name")
    await getUserNFTs("01501b4037bdeffd70849a86698922f6f3ed2ff52dad5235b2472b09ae66e48e8c")
  }
  const ibraheem = async()=>{
    const name = await cep47.name()
    console.log(name , "Contract Name")
    await getNFTsOwned("01501b4037bdeffd70849a86698922f6f3ed2ff52dad5235b2472b09ae66e48e8c")
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={()=>akram()}>jjjjjjjj</button>
        <button onClick={()=>ibraheem()}>Ibraheem</button>
      </header>
    </div>
  );
}

export default App;
