
import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";



function App() {
  const [mode, setMode]= useState('light');
  const [alert, setAlert]=useState(null);

  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    } ,2000);

  }

  const toggleMode = () =>{
    if (mode === 'light'){
       setMode('dark')
       document.body.style.backgroundColor ='grey';
       showAlert("DarkMode enabled", "Success ");
    }
    else{
      setMode('light')
      document.body.style.backgroundColor ='white';
      showAlert("LightMode enabled", "Success ");
    }
}
  return (
   <>
  <Router>
{/*<Navbar title =" TextUtils" aboutText="About TextUtils" /> */}
<Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
<Alert alert={alert}/>

<About/>
<div className='container my-3' > 
      <Routes>
          <Route exact path="/about">
            <About />
          </Route> 
          <Route exact path="/">
          <TextForm showAlert={showAlert}heading="Enter the text to analize" mode={mode} />
          </Route>
      </Routes>
        </div >
   </Router>

   </>
  );
}

export default App;
