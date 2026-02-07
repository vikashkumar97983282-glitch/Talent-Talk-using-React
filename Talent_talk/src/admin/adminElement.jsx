import React from "react";
import './adminElement.css'


function AdminElement(props){
    return (
        <div className="menu">
            <button>
                <img src={props.img} alt="" />{props.name}
            </button>
        </div>
    )
}

export default AdminElement;