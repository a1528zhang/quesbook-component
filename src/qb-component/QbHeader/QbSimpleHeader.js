import React, { Component } from 'react';
import './QbHeader.scss';
import logo from '../assets/image/logo/dark.png';

const QbSimpleHeader = () => (
    <div>
        <div className='section-ct-navbar'>
            <div className="navbar-logo">
                <img src={logo} alt=""/>
            </div>
        </div>
    </div>
);

export default QbSimpleHeader;
