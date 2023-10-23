import React, { Component } from 'react';
export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }
    componentDidMount() {
        this.populateWeatherData();
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
