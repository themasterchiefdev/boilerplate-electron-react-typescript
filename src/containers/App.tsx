import * as React from "react";
import { Component } from "react";
import { HelloWorld } from "../components/App/HelloWorld";

export class App extends React.Component {
	public render() {
		return (
			<div>
				<HelloWorld />
			</div>
		);
	}
}
