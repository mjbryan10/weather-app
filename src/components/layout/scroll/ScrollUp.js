import React, { Component } from "react";
import "./scrollUp.scss";

export default class ScrollUp extends Component {
	state = {
		isScrolled: false,
	};
	componentDidMount() {
		window.addEventListener("scroll", this.scrollActivate);
	}
	scrollActivate = () => {
		let height = 400; // Change this number depending on where you wish it to appear.
		let y = window.scrollY;
		if (y >= height) {
			this.setState({isScrolled: true})
		} else if (y < height) {
			this.setState({isScrolled: false})
		}
	};
	smoothScroll(e) {
		e.preventDefault();
		let duration = 1000;

		let targetPosition = 0;
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
	render() {
		return (
			<div className={"scroll-container" + (this.state.isScrolled ? ' active' : '')}>
				{/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
				<a href="#" className="scroll-text" onClick={this.smoothScroll}>
					&uarr;
				</a>
			</div>
		);
	}
}
