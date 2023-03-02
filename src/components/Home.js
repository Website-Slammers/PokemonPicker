import React from "react";
import { Link } from 'react-router-dom'

import './css/home.css'


const Home = ()=>{
    return(
        <div className="home">

            <img className="home-title" id="head-img" src="https://i.imgur.com/xotOQCg.png"></img>

            <Link className="home-button" to="/picker">
                P l a y !</Link>
        </div>
    )
}

export default Home;