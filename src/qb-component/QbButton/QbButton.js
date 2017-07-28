/**
 * Created by az on 2017/7/10.
 */
import React, {Component} from 'react';

/*eslint-disable*/
class QbButton extends Component {
    constructor(props) {
        super(props);
        this.mouseOverHandler = this.mouseOverHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
        this.state = {
            className : props.className?props.className.trim().split(/ +/):[],
        };
    }
    addClass(name) {
        let classNow = this.state.className;
        classNow.push(name);
        this.setState({
            className: classNow
        });
    }
    removeClass(name) {
        console.log('Tag ,', this.state.className.indexOf(name));
        let classNow = this.state.className;
        let index =this.state.className.indexOf(name);
        classNow.splice(index,1);
        this.setState({
            className: classNow
        });
    }
    mouseOverHandler() {
        this.addClass('hover');
    }
    mouseOutHandler() {
        this.removeClass('hover');
    }
    mouseUpHandler() {
        this.removeClass('click');
    }
    mouseDownHandler() {
        this.addClass('click');
    }
    iconClick(e) {
        const {iconClick} = this.props;
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        return iconClick();
    }
    render() {
        const {label, size, clickHandler, style, fontStyle, dataTarget, dataToggle, id, iconClick} = this.props;
        let height = 38;
        let fontSize = 21;
        let margin = '9px 26px';
        let btnSize = size?size:'default';
        switch (btnSize) {
            case 'small':
                height = 30;
                fontSize = 16;
                margin = '7px 20px';
                break;
            case 'default':
                height = 38;
                fontSize = 21;
                margin = '9px 26px';
                break;
            case 'large':
                height = 52;
                fontSize = 25;
                margin = '13px 36px';
                break;
            case 'blockLarge':
                height = 52;
                fontSize = 25;
                margin = '13px 62px';
                break;
        }
        let className = '';
        this.state.className.forEach((name)=> {
            className = className +' ' + name;
        });
        return (
            <button onMouseOver={this.mouseOverHandler}
                    onMouseOut={this.mouseOutHandler}
                    onMouseDown={this.mouseDownHandler}
                    onMouseUp={this.mouseUpHandler}
                    onClick={clickHandler?(e)=> clickHandler(e):()=>{}}
                    className={className}
                    id={id?id:null}
                    style={{...privateStyle.frame, ...style, height, fontSize}}
                    data-target={dataTarget?dataTarget:''}
                    data-toggle={dataToggle?dataToggle:''}>
                <div style={{...privateStyle.content, ...fontStyle, margin}}>
                    {label}
                </div>
                <div style={{width: 12, height: 12, marginRight: 15}} onClick={(e)=> this.iconClick(e)}>
                    {this.props.children}
                </div>
            </button>
        );
    }
}

const privateStyle = {
    frame: {
        borderRadius: 50,
        padding: 0,
        lineHeight: 0,
        display: 'flex',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    }
};

export default QbButton;