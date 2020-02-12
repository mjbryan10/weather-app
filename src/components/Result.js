import React, { Component } from "react";

function Rain(props) {
	let videoStyle = {
		width: "364px",
		height: "364px",
	};
	return (
		<React.Fragment>
			<p>Ah snap! Looks like it will be raining!</p>
			<p>Better dress appropiately...</p>
			<video
				poster="//i.imgur.com/kUspN1ph.jpg"
				preload="auto"
				autoplay="autoplay"
				muted="muted"
				loop="loop"
				webkit-playsinline=""
				style={videoStyle}
			>
				<source src="//i.imgur.com/kUspN1p.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</React.Fragment>
	);
}
function Chance(props) {
	return (
		<React.Fragment>
			<p>There's a {props.highestChance * 100}% chance that it might rain.</p>
			<img
				src="https://media.giphy.com/media/1HH6lJOzOXAY/giphy.gif"
				alt="Never tell me the odds"
				style={props.styleHeight}
			/>
		</React.Fragment>
	);
}
function Dry(props) {
	return (
		<React.Fragment>
			<p>Only a {props.highestChance * 100}% chance of rain, looking pretty dry.</p>
			<p>Maybe it's a good time to go on that adventure of yours!</p>
			<img
				src="https://media.giphy.com/media/Zs1PFiQsjqbRu/giphy.gif"
				alt="Going on an adventure"
				style={props.styleHeight}
			/>
		</React.Fragment>
	);
}
function Sunny(props) {
	return (
		<React.Fragment>
			<p>Looks like it might be sunny!</p>
			<p>.. bet you didn't expect that!</p>
			<img
				src="https://i.chzbgr.com/full/7425309184/hFA61DF3E/wake-up"
				alt="Sunny day"
				style={props.styleHeight}
			/>
		</React.Fragment>
	);
}
function Decider(props) {
	if (props.rainResult === "rain") {
		return <Rain />;
	} else if (props.rainResult === "chance") {
		return <Chance styleHeight={props.styleHeight} highestChance={props.highestChance} />;
	} else if (props.rainResult === "dry") {
		return <Dry styleHeight={props.styleHeight} highestChance={props.highestChance} />;
	} else if (props.rainResult === "sunny") {
		return <Sunny styleHeight={props.styleHeight} />;
	} else {
		return <p>Oops, looks like something went wrong!</p>
	}
}
export default class Result extends Component {
	smoothScroll(e) {
		// e.preventDefault();
		let duration = 1000;

		let targetPosition = document.querySelector(".results-container").offsetTop;
		let startPosition = window.pageYOffset;
		let distance = targetPosition - startPosition;
		let startTime = null;
		function animation(currentTime) {
			if (startTime === null) startTime = currentTime;
			let timeElapsed = currentTime - startTime;
			let run = ease(timeElapsed, startPosition, distance, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		}
		function ease(t, b, c, d) {
			//http://gizma.com/easing/ for equations
			t /= d;
			return c * t * t * t + b;
		}
		requestAnimationFrame(animation);
	}
	submitReset = e => {
		this.props.resetResult(e);
	};
	componentDidMount() {
		this.smoothScroll();
	}
	render() {
		let styleHeight = {
			height: "364px",
		};
		return (
			<div className="results-container">
				<h2>Result:</h2>
				<Decider
					styleHeight={styleHeight}
					rainResult={this.props.rainResult}
					highestChance={this.props.highestChance}
				/>
				<button className="reset-btn" onClick={this.submitReset}>
					Reset
				</button>
			</div>
		);
	}
}
