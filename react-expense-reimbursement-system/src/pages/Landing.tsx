import React from "react";
import { Image } from "react-bootstrap";
import example from "../images/landing_page.jpg";
// This is the admin homepage only accessable to admin

export class Landing extends React.Component <any, any> {
  render() {
    return (
      <div className="myPage" id="landingPage">
        <h1>Example Landing Page Bruh</h1>
        <Image src={`${example}`} fluid/>

      </div>
      
    )
  }
}
// This file should be the home button when not logged in