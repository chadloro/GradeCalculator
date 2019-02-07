import React from "react";

export default class Entry extends React.Component {
    handleRemoveEntry = (e) => {
        e.preventDefault();

        let index = e.target.elements.index.value;
        let weight = e.target.elements.weight.value;

        this.props.handleRemoveEntry(index, weight);
        
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleRemoveEntry}>
                <input type="hidden" name="index" value={this.props.index} />
                <input type="text" name="title" value={this.props.title} readOnly />
                <input type="number" name="grade" value={this.props.grade} readOnly />
                <input type="number" name="weight" value={this.props.weight} readOnly />
                <button>-</button>
            </form>
        </div>
        )
    }
}