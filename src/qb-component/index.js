/**
 * Created by az on 2017/7/12.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import QbLayout, { QbSimpleLayout } from './QbLayout';
import './scss/_variables.scss';
import {NAV_ITEM_LIST} from './common/const';
import Routers from './router';

class App extends Component {
    render() {
        return(
            <div>
                <QbLayout navItemList={NAV_ITEM_LIST} gqlUrl="https://stg.quesbook.com/graphql">
                    <Routers/>
                </QbLayout>
            </div>
        )
    }
}

const div = document.getElementById('root');
ReactDOM.render(<App />, div);

