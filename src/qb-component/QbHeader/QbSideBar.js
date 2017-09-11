import React, {Component} from 'react';
import './QbSideBar.scss';
import cancelIcon from '../assets/image/icon/x-icon@3x.png';
import QbAvatar from './QbAvatar';

class QbSideBar extends Component {
    render() {
        let currentUser = this.state.currentUser;

        return (
            <div className="section-ct-navbarside">
                {this.renderSideCover(currentUser)}
                {this.renderSideSection(currentUser)}
            </div>
        );
    }

    renderSideCover(currentUser) {
        if (this.state.isShow) {
            return (
                <div className="col-4 col-md-8 col-lg-12 navbarside-cover"
                    onClick={this.hideNavSideBar.bind(this)}
                    onMouseOver={this.hideNavSideBar.bind(this)}></div>
            );
        }
    }

    renderSideSection(currentUser) {
        if (this.state.isShow) {
            return (
                <div className='no-gutters col-lg-2 navbarside-section'>
                    <div className="no-gutters col-8 col-md-4 col-lg-2 navbarside-content">
                        {this.renderUserIconSection(currentUser)}
                        {this.renderUserExamSection(currentUser)}
                        <div className='col-lg-12 section-user'>
                            <div onClick={this.props.onClick_MyClass}>
                                My Class
                            </div>
                            <div onClick={this.props.onClick_Setting}>
                                My Account
                            </div>
                            <div onClick={this.onClick_SignOut.bind(this)}>Log out</div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    constructor() {
        super();

        this.state = {
            currentUser: null,
            isShow: false
        };
    }

    componentWillMount() {
        let currentUser = this.props.currentUser;
        let isShow = false;
        if (currentUser) {
            isShow = this.props.isShow;
        }

        this.setState({currentUser: currentUser, isShow: isShow})
    }

    componentWillReceiveProps(newProps) {
        let currentUser = newProps.currentUser;
        let isShow = false;
        if (currentUser) {
            isShow = newProps.isShow;
        }
        this.setState({currentUser: currentUser, isShow: isShow});
    }

    onClick_SignOut() {
        this.props.onClick_SignOut();
        this.hideNavSideBar();
    }

    hideNavSideBar() {
        this.props.onHideSideBar();
        this.setState({isShow: false});
    }

    renderUserExamSection(currentUser) {
        if (currentUser) {
            let currentUserExamList = currentUser.exam_type_names;
            let examItemList = currentUserExamList.map((item, index) => {
                return (
                    <div key={index}>
                        {item}
                    </div>
                );
            });

            return (
                <div className='col-lg-12 section-exam'>
                    <div className='title'>
                        My tests
                    </div>
                    {examItemList}
                </div>
            );
        }
    }

    renderUserIconSection(currentUser) {
        if (currentUser) {
            return (
                <div className="row no-gutters col-lg-12 navbarside-user">
                    <div className="icon">
                        <QbAvatar user={currentUser}></QbAvatar>
                    </div>
                    <div className="text">{currentUser.name}</div>
                    <div className="close" onClick={this.hideNavSideBar.bind(this)}>
                        <img style={{
                            height: 16,
                            width: 16
                        }} src={cancelIcon} href=""/>
                    </div>
                </div>
            );
        }
    }
}
export default QbSideBar;
