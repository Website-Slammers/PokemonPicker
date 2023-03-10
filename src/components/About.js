import React from "react";

import Header from './Header'

const About = ()=>{
    

    return(
        <div id="about-return">
            <Header />
            <h2>
                <span className="header-page">
                    O u r - S t o r y</span>
            </h2>
            <div className="about-article-containerA">
                <div id="about-article-flexbox">
                    <article>
                        <p id="about-text">
                            This is all started when Ser Ian the Glam defeated his first glamgal. On the long journey home after such a great victory, Ser Ian stumbled upon the website either.io and found himself lost in clicking left and right, then right and left, and so on. This addictive experience traumatized Ser Ian even more than the glamgals that terrorized his home as a child. Using his encyclopedic knowledge of Pokemon, Ser Ian the Glam devoted his days and Knights to recreating the either.io experience through the lens of rating Pokemon. 
                            Drewford made the page look slightly nicer.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default About;