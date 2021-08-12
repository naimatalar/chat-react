import React from "react"
import { Link } from "react-router-dom"

const NavigationTree = () => {
    var data = window.location.href.split("/");
    data = data[data.length - 1]

    return (
        <>
            <div className="logo"><a href="/" className="simple-text logo-normal">

                <img style={{ width: "70%" }} src={require("../assets/image/mutlu.png").default}></img>
            </a></div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className={"nav-item " + (data == "user" ? "active" : "")}>
                        <a href="/user" className="nav-link">
                            <i className="material-icons">group</i>
                            <p>Kullanıcılar</p>
                        </a>
                    </li>
                    <li className={"nav-item " + (data == "sites" ? "active" : "")}>
                        <a className="nav-link" href="/sites">
                            <i className="material-icons">travel_explore</i>
                            <p>Web Siteler</p>
                        </a>
                    </li>
                            <li className={"nav-item " + (data == "message" ? "active" : "")}>
                        <a className="nav-link" href="/message">
                            <i className="material-icons">mark_chat_read</i>
                            <p>Yazışmalar</p>
                        </a>
                    </li>

                </ul>
            </div>
        </>
    )
}
export default NavigationTree