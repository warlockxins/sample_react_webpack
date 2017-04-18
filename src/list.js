import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

var ListItems = React.createClass({
    shouldComponentUpdate(nextProps, nextState) {
        let d = _.difference(nextProps.listItems, this.props.listItems)
        return d.length;
    },
    pressedItem(index) {
        this.props.listItemPressed(index)
    },
    render() {
        let self = this;
        let time = " remember when I was updated " + new Date();
        return (
            <ul>
                {
                    this.props.listItems.map((item, index) => {
                        return <li key={index} onClick={ self.pressedItem.bind(self, index) }>
                            {item}
                            {time}
                        </li>
                    })
                }
            </ul>
        )
    }
});

export default ListItems