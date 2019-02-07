import React from "react";

export default class AddEntry extends React.Component {
    state = {
        error: undefined
    }

    handleAddEntry = (e) => {
        e.preventDefault();

        const title = e.target.elements.title.value;
        const grade = e.target.elements.grade.value;
        const weight = e.target.elements.weight.value;

        e.target.elements.title.value = '';
        e.target.elements.grade.value = '';
        e.target.elements.weight.value = '';

        const error = this.props.handleAddEntry(title, grade, weight);

        this.setState(() => ({error}))

    }
    
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                {this.props.totalWeight != 100 ? 
                <form onSubmit={this.handleAddEntry}>
                    <input type="text" name="title" placeholder="Name of assessment"></input>
                    <input type="number" name="grade" placeholder="Grade"></input>
                    <input type="number" name="weight" placeholder="Weight"></input>
                    <button>+</button>
                </form> : ''}

            </div>
        )

    }
}