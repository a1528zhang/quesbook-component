import React, { Component } from 'react';
import './QbLayout.scss';
import { QbSimpleHeader } from '../QbHeader';
import QbFooter from '../QbFooter';

const QbSimpleLayout = (props) => (
    <div className="layout-ct">
        <QbSimpleHeader/>
        <div className="body-content">
            {props.children}
        </div>
        <QbFooter/>
    </div>
);

export default QbSimpleLayout;