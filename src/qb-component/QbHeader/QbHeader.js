import React, {Component} from 'react';
import './QbHeader.scss';
import logo from '../assets/image/logo/dark.png';
import QbSideBar from './QbSideBar';
import {Link} from 'react-router';
import QbMessageCard from '../QbMessageCard';
import QbAvatar from './QbAvatar';

class QbHeader extends Component {
    constructor() {
        super();

        this.state = {
            activeClass: '',
            currentUser: null,
            linkItems: [],
            isShowSideBar: false,
            showMessageCard: false,
            messageTitle: '',
            messageContent: ''
        };
    }

    componentWillMount() {
        const {client, messageId} = this.props;
        if (messageId !== null && messageId !== undefined) {
            // query message content
            client.query({query: gql `
              query {

              }
            `, fetchPolicy: 'network-only'}).then((res) => {
                this.setState((prevState, props) => ({
                    showMessageCard: !prevState.showMessageCard,
                    currentUser: props.currentUser,
                    linkItems: props.navItemList
                }), () => this.resetNavLinkItem_Active(window.location.hash));
            }).catch((e) => {
                console.info(e);
            });
        } else {
            this.setState({
                currentUser: this.props.currentUser,
                linkItems: this.props.navItemList
            }, () => this.resetNavLinkItem_Active(window.location.hash));
        }
    }

    componentWillReceiveProps(newProps) {
        let currentUser = newProps.currentUser;
        this.setState({
            currentUser: currentUser,
            linkItems: newProps.navItemList
        }, () => this.resetNavLinkItem_Active(window.location.hash));
    }

    componentDidMount() {
        // window.addEventListener('scroll', (event) => {
        //     var doc = document.documentElement;
        //     var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        //     let classScroll = '';
        //     if (top > 50) {
        //         classScroll = 'navbar-scroll-over';
        //     } else {
        //         classScroll = '';
        //     }
        //
        //     this.setState({activeClass: classScroll});
        // });
    }

    onClick_NavLinkItem(item, e) {
        if (item && item.isRedirect) {
            e.preventDefault();
            window.location.href = window.location.origin + item.href;
        }

        this.resetNavLinkItem_Active(e.target.hash);
    }

    resetNavLinkItem_Active(hashName) {
        this.setState({isShowSideBar: false});
        let linkItems = this.state.linkItems;

        if (linkItems.length && linkItems.length > 0) {
            linkItems.map((item, index) => {
                item.isActive = hashName.indexOf(item.href) !== -1;
            });

            this.setState({linkItems: linkItems});
        }
    }

    onHover_Signed() {
        console.log('onHover_Signed');
        this.setState({isShowSideBar: true});
    }

    onClick_SignOut() {
        this.props.onClick_SignOut();
    }

    hideSideBar() {
        this.setState({isShowSideBar: false});
    }

    renderLinkItems() {
        let ret = [];

        ret = this.state.linkItems.map((item, index) => {
            return (
                item.isRedirect
                ? renderExternalLink(item)
                : renderInnerLink(item)
            );
        });

        return (
            <ul>
                {ret}
            </ul>
        );
    }

    renderSignedLink(currentUser) {
        if (currentUser && this.state.linkItems) {
            return (
                <div className='section-ct-link'>
                    {this.renderLinkItems()}
                </div>
            );
        }
    }

    renderInnerLink(props) {
        return (
            <li className={props.item.isActive
                ? 'active'
                : ''}>
                <Link to={props.item.href} onClick={props.onClick_NavLinkItem}>
                    {props.item.label}
                </Link>
            </li>
        ); 
    }

    renderExternalLink(props) {
        return (
            <li className={props.item.isActive
                ? 'active'
                : ''}>
                <a href='/eclass' onClick={props.onClick_NavLinkItem}>
                    {props.item.label}
                </a>
            </li>
        ); 
    }

    messageToggle() {
        const {client} = this.props;
        // update message read record while close message card

        // client.query({query: gql `
        //   query {
        //
        //   }
        // `, fetchPolicy: 'network-only'}).then((res) => {
        this.setState((prevState, props) => ({
            showMessageCard: !prevState.showMessageCard
        }));
        // }).catch((e) => {
        //     console.info(e);
        // });
    }

    renderSign(currentUser) {
        if (currentUser) {
            let userName = currentUser.name;

            return (
                <div className='navbar-signed box-flex-center'>
                    <div className='signed-text'>
                        Welcome, {userName}!
                    </div>
                    <div className='signed-avatar' onClick={this.onHover_Signed.bind(this)} onMouseOver={this.onHover_Signed.bind(this)}>
                        <QbAvatar user={currentUser}></QbAvatar>
                    </div>
                    <div className='signed-arrowdown'></div>
                </div>
            );
        } else {
            return (
                <div className='navbar-unsigned box-flex-center'>
                    <a href="/users/sign_in">Log in</a>
                    <a className='navbar-unsigned-signup' href="/users/sign_up">Sign up</a>
                </div>
            );
        }
    }

    renderTargetExam(currentUser) {
        if (currentUser && currentUser.exam_type_names.length > 0) {
            return currentUser.exam_type_names[0];
        } else {
            return null;
        }
    }

    renderQbSideBar(currentUser) {
        if (this.state.isShowSideBar) {
            return (<QbSideBar
                currentUser={currentUser}
                isShow={this.state.isShowSideBar}
                onHideSideBar={this.hideSideBar.bind(this)}
                onClick_Setting={this.props.onClick_Setting} 
                onClick_SignOut={this.onClick_SignOut.bind(this)}/>);
        }
    }

    render() {
        let currentUser = this.state.currentUser;
        return (
            <div>
                <div className={this.state.activeClass}>
                    <div className='section-ct-navbar'>
                        <div className="navbar-logo">
                            <img src={logo} alt=""/>
                            <span>{this.renderTargetExam(currentUser)}</span>
                        </div>
                        {this.renderSign(currentUser)}
                    </div>
                    {this.renderSignedLink(currentUser)}
                    <QbMessageCard display={this.state.showMessageCard} size="xs" title={this.state.messageTitle} content={this.state.messageContent} messageStyle={{}} onCancelClick={this.messageToggle.bind(this)}/>
                </div>
                {this.renderQbSideBar(currentUser)}
            </div>
        );
    }
}

export default QbHeader;
