import React, { createRef, useEffect, useRef, useState } from "react"
import reactDom from "react-dom"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

export const NavbarPage = (props) => {
    const [dropdownIcons, setDropdownIcons] = useState("")

    const [collapse, setCollapse] = useState(false)




    const toggleMinNavigation = () => setCollapse(!collapse);

    var data = window.location.href.split("/");
    data = data[data.length - 1]
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <a className="navbar-brand" >{props.pageName}</a>
                    </div>
                    <div className="row">
                        <button className="navbar-toggler" onClick={toggleMinNavigation} type="button" >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                            <span className="navbar-toggler-icon icon-bar"></span>
                        </button>
                    </div>



                    <div className="collapse navbar-collapse justify-content-end">
                        <form className="navbar-form">
                            <div className="input-group no-border">
                                <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                    <i className="material-icons">search</i>
                                    <div className="ripple-container"></div>
                                </button>
                            </div>
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="material-icons">dashboard</i>
                                    <p className="d-lg-none d-md-block">
                                        Stats
                                    </p>
                                </a>
                            </li>

                            <li className="nav-item dropdown" onBlur={() => { setDropdownIcons(""); }} >
                                <a className="nav-link" href="#" onClick={() => { setDropdownIcons("navbarDropdownMenuLink") }} id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">notifications</i>
                                    <span className="notification">5</span>
                                    <p className="d-lg-none d-md-block">
                                        Some Actions
                                    </p>
                                </a>
                                {
                                    dropdownIcons == "navbarDropdownMenuLink" &&

                                    <div className="dropdown-menu show dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="#">Mike John responded to your email</a>
                                        <a className="dropdown-item" href="#">You have 5 new tasks</a>
                                        <a className="dropdown-item" href="#">You're now friend with Andrew</a>
                                        <a className="dropdown-item" href="#">Another Notification</a>
                                        <a className="dropdown-item" href="#">Another One</a>
                                    </div>
                                }

                            </li>
                            <li className="nav-item dropdown" onClick={() => { setDropdownIcons("navbarDropdownProfile"); }} >
                                <div onMouseLeave={() => { setDropdownIcons("") }}>


                                    <a className="nav-link" href="#" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="material-icons">person</i>
                                        <p className="d-lg-none d-md-block">
                                            Account
                                        </p>
                                    </a>
                                    {dropdownIcons == "navbarDropdownProfile" &&
                                        <div style={{

                                            marginTop: -5,
                                            width: "289px",
                                            paddingBottom: "41px",
                                            paddingTop: "22px"

                                        }} className="dropdown-menu show dropdown-menu-right " id="lls" aria-labelledby="navbarDropdownProfile">
                                            <a style={{ justifyContent: "center" }} className="dropdown-item" href="#">Profile</a>
                                            <a style={{ justifyContent: "center" }} className="dropdown-item" href="#">Settings</a>
                                            <div className="dropdown-divider"></div>
                                            <a style={{ justifyContent: "center", textAlign: "center" }} style={{ width: "100%" }} className="dropdown-item" onClick={() => { localStorage.removeItem("ultumtoken"); window.location.replace("/") }}>Log out</a>
                                        </div>
                                    }

                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="row toggle-menu " >
                        <Collapse isOpen={collapse}>
                            
                                <ul className="nav pb-5">
                                    <li className={"nav-item col-12 mb-3 "  + (data == "user" ? "active" : "")}>
                                        <a href="/user" className="nav-link">
                                            <i className="material-icons pull-left">group</i>
                                            &nbsp; Kullanıcılar
                                        </a>
                                    </li>
                                    <li className={"nav-item col-12 mb-3 " + (data == "sites" ? "active" : "")}>
                                        <a className="nav-link" href="/sites">
                                            <i className="material-icons pull-left">travel_explore</i>
                                            &nbsp; Web Siteler
                                        </a>
                                    </li>
                                    <li className={"nav-item col-12 mb-3 " + (data == "message" ? "active" : "")}>
                                        <a className="nav-link" href="/message">
                                            <i className="material-icons pull-left">mark_chat_read</i>
                                            &nbsp; Yazışmalar
                                        </a>
                                    </li>

                                </ul>
                            

                        </Collapse>
                    </div>
                </div>
            </nav>

        </>

    )

}
