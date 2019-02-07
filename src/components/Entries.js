import React from "react";

const Entries = (props) => {
    let entries = []

    for (let i = 0; i < props.numAssessments; i++) {
        entries.push(<Entry 
            key={i}
            index={i}
            handleRemoveEntry={props.handleRemoveEntry} 
            title={props.titleArray[i]}
            grade={props.gradeArray[i]}
            weight={props.weightArray[i]}
        />)
    } //TODO: add unique keys somehow

    return (
        <div>
            {entries}
        </div>
    )
}

export default Entries;