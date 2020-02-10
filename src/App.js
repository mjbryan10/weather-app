import React, { Component } from "react";
import "./App.scss";

import Data from "./resources/data/data";

import Header from "./components/layout/Header";
import Alert from "./components/Alert";
import Question from "./components/Question";

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
				</div>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
			</div>
		);
	}
}
