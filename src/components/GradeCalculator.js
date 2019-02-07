import React from "react";

import Header from "./Header";
import Entries from "./Entries";
import AddEntry from "./AddEntry";
import EntryInfo from "./EntryInfo";
import Result from "./Result";

export default class GradeCalculator extends React.Component {
    state = {
        numAssessments: props.numAssessments,
        totalWeight: props.totalWeight,
        titleArray: props.titleArray,
        gradeArray: props.gradeArray,
        weightArray: props.weightArray
    }

    handleAddEntry = (title, grade, weight) => {
        if (!title || !grade || !weight) {
            return 'All fields must be filled out'
        } else if ((grade < 0 || grade > 100) || (weight < 0 || weight > 100)) {
            return 'Grade/Weight must be between 0 and 100'
        } else if (this.state.totalWeight + parseInt(weight) > 100) {
            return 'Total weights must equal 100'
        } else {
            this.setState((prevState) => ({
                numAssessments: prevState.numAssessments + 1,
                totalWeight: prevState.totalWeight + parseInt(weight),
                titleArray: prevState.titleArray.concat(title),
                gradeArray: prevState.gradeArray.concat(grade),
                weightArray: prevState.weightArray.concat(weight),
            }))
        }
    }

    handleRemoveEntry = (index, weight) => {
        this.setState((prevState) => ({
            numAssessments: prevState.numAssessments - 1,
            totalWeight: prevState.totalWeight - parseInt(weight),
            titleArray: prevState.titleArray.splice(index, 1),
            gradeArray: prevState.gradeArray.splice(index, 1),
            weightArray: prevState.weightArray.splice(index, 1)
        }))

        console.log(this.state.titleArray);
        console.log(this.state.gradeArray);
        console.log(this.state.weightArray);
    }

    calculate = () => {
        let totalGrade = 0;

        for (let i = 0; i < this.state.gradeArray.length; i++) {
            totalGrade += this.state.gradeArray[i] * (this.state.weightArray[i] / 100); 
        }

        return totalGrade;

    }

    changeWeight = () => {
        this.setState(() => ({
            totalWeight: 25
        }))
    }
    
    render() {
        return (
            <div>
                <Header />
                <Entries 
                    numAssessments={this.state.numAssessments}
                    handleRemoveEntry={this.handleRemoveEntry}
                    titleArray={this.state.titleArray}
                    gradeArray={this.state.gradeArray}
                    weightArray={this.state.weightArray} />
                <AddEntry 
                    totalWeight={this.state.totalWeight}
                    handleAddEntry={this.handleAddEntry}/>
                <EntryInfo
                    numAssessments={this.state.numAssessments}
                    totalWeight={this.state.totalWeight} />
                <Result 
                    totalWeight={this.state.totalWeight}
                    calculate={this.calculate}/>
            </div>
        )
    }
}

GradeCalculator.defaultProps = {
    numAssessments: 0,
    totalWeight: 0,
    titleArray: [],
    gradeArray: [],
    weightArray: []
}