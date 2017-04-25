import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
var createReactClass = require('create-react-class');

var UserListItems = createReactClass({
    getInitialState() {
        return {
            items: []
        }
    },
    componentDidMount() {
        this.loadData();
    },

    loadData() {
        fetch("/getSpoofData")
        .then((result) => {
            return result.json();
        }) 
        .then((items)=> {
            this.setState(
                { items: items }
            );
        });
    },
    addNewData() {
        let self = this;
        fetch("/addSpoofData")
        .then((result) => {
            self.loadData();
        });
    },
    removeData(id) {
        let self = this;
        let url = "/removeSpoofData/" + id;
        fetch(url)
        .then((result) => {
            self.loadData();
        });
    },
    render() {
        return (
            <div>
                <hr/>
                <span onClick= { this.addNewData }> Add new record </span>
                <ul>
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <li key={ index }>
                                   <span onClick={ this.removeData.bind(this, item._id) }>(X)</span> { item.name } { item.mail } { item.createdAt }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
});

export default UserListItems
