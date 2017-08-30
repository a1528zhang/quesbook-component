/**
 * Created by az on 2017/7/20.
 */
import React, {Component} from 'react';
import up from '../assets/image/icon/caret-up@3x.png';
import down from '../assets/image/icon/caret-down@3x.png';

/*eslint-disable*/
class QbTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state= {
            hour: 1,
            periods: 'AM',
            displayPicker: false,
        }
    }
    padNumber(num, fill) {
        let len = ('' + num).length;
        return (new Array(
            fill > len ? fill - len + 1 || 0 : 0
        ).join(0) + num);
    }
    addHour() {
        if (this.state.hour === 12) {
            let p = this.state.periods==='AM'?'PM':'AM';
            this.setState({
                hour: 1,
                periods: p,
            })
        } else {
            this.setState((prevState, props) => ({
                hour: prevState.hour + 1,
            }));
        }

    }
    minHour() {
        if (this.state.hour === 1) {
            let p = this.state.periods==='AM'?'PM':'AM';
            this.setState({
                hour: 12,
                periods: p,
            })
        } else {
            this.setState((prevState, props) => ({
                hour: prevState.hour - 1,
            }));
        }
    }
    togglePeriods() {
        let p = this.state.periods==='AM'?'PM':'AM';
        this.setState({
            periods: p,
        });
    }
    toggleDisplayPicker() {
        this.setState((prevState, props) => ({
            displayPicker: !prevState.displayPicker,
        }));
    }
    render() {
        const {size, btnStyle, ensureTime} = this.props;
        let finalStyle = eval("style.button."+ (size?size:"default"));
        let hourStr = this.padNumber(this.state.hour, 2);
        let time = hourStr + ' ' + this.state.periods;
        let timeHour = 1;
        if (this.state.periods==='AM') {
            timeHour = this.state.hour;
        } else if(this.state.periods==='PM') {
            timeHour = this.state.hour + 12;
        }
        let display = this.state.displayPicker?'flex':'none';
        if (!this.state.displayPicker) {
            ensureTime(timeHour);
        }
        return (
            <div style={{height: finalStyle.height, position: 'relative'}}>
                <button className="btn btn-secondary"
                        style={{...style.button.publicStyle,
                    height: finalStyle.height,
                    fontSize: finalStyle.fontSize, ...btnStyle,}} onClick={this.toggleDisplayPicker.bind(this)}>{time}</button>
                <div className="dropdown-menu dropdown-menu-left"
                     style={{...style.timePicker, display: display}}>
                    <div style={style.hourPicker}>
                        <button className="btn btn-secondary"
                                style={style.pickerButton}
                                onClick={this.addHour.bind(this)}>
                            <img style={style.upImg} src={up} alt=""/>
                        </button>
                        <div style={style.hour}>{hourStr}</div>
                        <button className="btn btn-secondary" style={style.pickerButton}
                                onClick={this.minHour.bind(this)}>
                            <img style={style.downImg} src={down} alt=""/>
                        </button>
                    </div>
                    <div style={style.hourPicker}>
                        <button className="btn btn-secondary" style={style.pickerButton}
                                onClick={this.togglePeriods.bind(this)}>
                            <img style={style.upImg} src={up} alt=""/>
                        </button>
                        <div style={style.periods}>{this.state.periods}</div>
                        <button className="btn btn-secondary" style={style.pickerButton}
                                onClick={this.togglePeriods.bind(this)}>
                            <img style={style.downImg} src={down} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    pickerButton: {
        height: 50,
        width: 50,
        border: 0,
        padding: 0
    },
    upImg: {
        height: 12,
    },
    downImg: {
        height: 12,
    },
    timePicker: {
        height: 200,
        width: 275,
        border: '1px solid #cccccc',
        display: 'flex',
        flexDirection: 'row',
    },
    hourPicker: {
        flex: 1,
        display: 'flex',
        height: '100%',
        width: 100,
        flexDirection: 'column',
        alignItems: 'center',
    },
    hour: {
        fontSize: 56
    },
    periodsPicker: {
        flex: 1,
        display: 'flex',
        height: '100%',
        width: 100,
        flexDirection: 'column',
        alignItems: 'center',
    },
    periods: {
        fontSize: 56
    },
    button: {
        publicStyle: {
            border: '1px solid #cccccc',
            lineHeight: 1,
            width: 150,
        },
        small: {
            height: 30,
            fontSize: 16,
            margin: '7px 20px',
        },
        default: {
            height: 38,
            fontSize: 21,
            margin: '9px 26px',
        },
        large: {
            height: 52,
            fontSize: 25,
            margin: '13px 36px',
        },
        blockLarge: {
            height: 52,
            fontSize: 25,
            margin: '13px 62px',
        }
    },
}

export default QbTimePicker;