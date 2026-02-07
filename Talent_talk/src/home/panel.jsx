import React from "react";
import './panel.css'

function Panel(props){
    return (
        <div className="panel-content" >  
            <button>{props.panel}</button>
        </div>
    )
}

export default Panel;