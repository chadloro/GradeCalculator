import React from "react";

const Result = (props) => {
    return (
        <div>
            {props.totalWeight == 100 ? <h1>Your total grade is: {props.calculate()}%</h1> : ""}
        </div>
    )
}

export default Result;