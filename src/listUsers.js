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
    removeData(id, index) {
        let self = this;
        let url = "/removeSpoofData/" + id;
        fetch(url)
        .then((result) => {
            this.removeElementFromList(index);
        });
    },
    removeElementFromList(index) {
        let {items} = this.state;
        items.splice(index, 1);

        this.setState(items);
    },
    render() {
        return (
            <div>
                <hr/>
                <span onClick= { this.addNewData }> Add new record </span>
                <ul className="user-list">
                    {
                        this.state.items.map((item, index) => {
                            return (
                                <li key={ index }>
                                   <span onClick={ this.removeData.bind(this, item._id, index) }>(X)</span> { item.name } { item.mail } { item.createdAt }
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
