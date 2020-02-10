import React, { Component } from "react";
import "./App.scss";
import './vendors/weather_icons/css/weather-icons.min.css'

import Data from "./resources/data/data";

import Header from "./components/layout/Header";
import Alert from "./components/Alert";
import Question from "./components/Question";
import Summary from './components/Summary'

export default class App extends Component {
	state = {
		data: Data,
		// data: {},
		datastate: "loading", //"ready", "loading", "none"
		result: "", //returned result from Question: can be rain, chance or sunny
	};
	render() {
		return (
			<div className="app-container">
				{this.state.data.alerts ? <Alert alerts={this.state.data.alerts}></Alert> : ""}
				<Header></Header>
				<div className="content-container">
					<Question></Question>
					<p>{this.state.datastate === "ready" ? <span>"Hello World"</span> : ""}</p>
          <Summary weatherData={this.state.data}></Summary>
				</div>
        <footer><a href="https://darksky.net/poweredby/">Powered by Dark
          Sky</a></footer>
			</div>
		);
	}
}
