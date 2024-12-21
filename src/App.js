import './App.css';

import React,{ Component } from 'react'
import Navbar from './components/Navbar';
import Newscomponent from './components/Newscomponent';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state={
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  key=process.env.REACT_APP_API_KEY
  render() {
    let a=new Date()
    a.setDate(a.getDate() - 5)
    let formatted_date= a.getFullYear() + "-" +(a.getMonth()+1) + "-" + (('0'+a.getDate()).slice(-2))
    return (
      <>
      <Router>
      <LoadingBar
        height={3}
        color='#127ced'
        progress={this.state.progress}
        loaderSpeed={900}
      />
        <Navbar/>
        <Routes>
          <Route path="/" element={<Newscomponent setProgress={this.setProgress} api_key={this.key}key="general" title="Latest News" country="" category="politics,health,science,lifestyle,travel,culture,education,environment" date={formatted_date} />}/>
          <Route path="/World" element={<Newscomponent setProgress={this.setProgress} api_key={this.key} key="business" title="Market Watch" country="" category="business" date={formatted_date}/>}/>
          <Route path="/Sports" element={<Newscomponent setProgress={this.setProgress} api_key={this.key}key="sports" title="Sports News" country="in" category="sports" date={formatted_date}/>}/>
          <Route path="/Entertainment" element={<Newscomponent setProgress={this.setProgress} api_key={this.key}key="entertainment" title="Entertainment News" country="in" category="entertainment" date={formatted_date}/>}/>
          <Route path="/Tech" element={<Newscomponent setProgress={this.setProgress} api_key={this.key}key="tech" country="" title="Tech News" category="technology" date={formatted_date}/>}/>
        </Routes>
      </Router>
      </>
    )
  }
}
