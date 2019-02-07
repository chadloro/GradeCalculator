import React from "react";

const EntryInfo = (props) => {
    return (
            <div>
                <h3>Total number of assessments: {props.numAssessments}</h3>
                <h3>Total weight: {props.totalWeight}%</h3>
            </div>
    )
}

export default EntryInfo;