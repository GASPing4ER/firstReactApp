import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll"
import ErrorBoundry from "../components/ErrorBoundry";
import './app.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ""
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }
    
    onSearchChange =(event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const { robots, searchField } = this.state;
        const filteredRobot = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        // if/else statement made more clean:
        return !robots.length ?
        <h1>Loading</h1>:
        (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobot}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }

export default App