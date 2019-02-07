import React from "react";

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

Header.defaultProps = {
    title: 'Grade Calculator'
}

export default Header;