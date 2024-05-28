import React from "react";
import Logo from "../../assets/images/NavLogo.png";
import "./Footer.css";
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                        <h5 className="footer-heading text-center">About The Fish Diary</h5>
                        <p className="footer-text text-center">
                            The Fish Diary is a platform that allows you to keep track of your fish tanks and fish. Discover amazing fish species, learn about fish care, and more.
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3 d-flex justify-content-center">
                        <img src={Logo} alt="AstroNet Logo" className="footer-image"/>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-3 d-flex justify-content-lg-end justify-content-center align-items-center">
                        <div>
                            <h5 className="footer-heading text-center">- Follow Us -</h5>
                            <ul className="list-unstyled footer-social d-flex justify-content-center text-center">
                                <li className="mr-3">
                                    <a href="#" className="footer-icon">
                                        <TwitterOutlined />
                                    </a>
                                </li>
                                <li className="mr-3">
                                    <a href="#" className="footer-icon">
                                        <FacebookOutlined />
                                    </a>
                                </li>
                                <li className="mr-3">
                                    <a href="#" className="footer-icon">
                                        <InstagramOutlined />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="footer-text text-center">© 2024 AstroNet. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
