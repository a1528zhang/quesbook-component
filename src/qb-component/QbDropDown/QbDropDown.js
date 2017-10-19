/**
 * Created by az on 2017/7/17.
 */
import React, { Component } from 'react';
import QbDropDownItem from './QbDropDownItem';
import './QbDropDown.scss';

/*eslint-disable*/
class QbDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedObj: props.defaultData,
            keyword: ''
        }
    }
    // componentDidUpdate() {
    //     const {onChange} = this.props;
    //     onChange(this.state.selectedObj);
    // }
    componentWillReceiveProps(nextProps) {
        let oldDefaultValue = this.props.defaultData.value;
        let newDefaultValue = nextProps.defaultData.value;
        if (oldDefaultValue !== newDefaultValue) {
            this.setState({
                selectedObj: nextProps.defaultData
            })
        }
    }
    renderInputComp() {
        const { compClass,
            compStyle, inputType, btnStyle, size, inputClassName, dropdownStyle, onChange,
            content, inputStyle
        } = this.props;
        let children;
        if (inputType === 'button') {
            children = content.map((data, index) =>
                <QbDropDownItem label={data.label} key={index} value={data.value} onClick={(data) => {
                    this.setState({
                        selectedObj: data
                    });
                    onChange(data);
                }} />
            );
        } else if (inputType === 'input') {
            let filterArray = content.filter((data) => {
                if (data.label.indexOf(this.state.keyword) !== -1) {
                    return true;
                } else {
                    return false;
                }
            });
            children = filterArray.map((data) => {
                return (<QbDropDownItem label={data.label} value={data.value} onClick={() => {
                    this.setState({
                        selectedObj: data
                    });
                    onChange(data);
                }} />);
            }
            );
        }
        switch (inputType) {
            case 'button':
                let btnClass = "btn " + (inputClassName ? inputClassName : 'btn-secondary');
                let finalStyle = eval("style.button." + (size ? size : "default"));
                let btnSize = '';
                switch (size) {
                    case 'default':
                        break;
                    case 'large' || 'blockLarge':
                        btnSize = 'btn-lg ';
                        break;
                    case 'small':
                        btnSize = 'btn-sm ';
                        break;
                }
                let dropDownClass = btnSize + 'btn btn-secondary dropdown-toggle';
                return (
                    <div className={compClass + ' btn-group'} style={{ height: finalStyle.height, ...compStyle }}>
                        <button type="button"
                            className={btnSize + btnClass}
                            onChange={(e) => {
                                this.setState({
                                    keyword: e.target.value
                                });
                                onChange(this.state.selectedObj);
                            }}
                            style={{
                                ...style.button.publicStyle,
                                height: finalStyle.height,
                                borderRight: 0,
                                fontSize: finalStyle.fontSize,
                                ...btnStyle,
                            }}>
                            {this.state.selectedObj.label}
                        </button>
                        <button type="button" style={{ ...style.button.publicStyle, borderLeft: 0, }}
                            className={dropDownClass} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" style={dropdownStyle}>
                            {children}
                        </div>
                    </div>
                );
            case 'input':
                let finalInputStyle = eval("style.input." + (size ? size : "default"));
                return (
                    <div className={compClass} style={{ ...finalInputStyle, position: 'relative', ...compStyle }}>
                        <input type="text" style={{ ...finalInputStyle, ...inputStyle }} data-toggle="dropdown" className="form-control" onChange={(e) => {
                            this.setState({
                                keyword: e.target.value
                            });
                            // onChange(this.state.selectedObj);
                        }} />
                        <div className="dropdown-menu dropdown-menu-right" style={dropdownStyle}>
                            {children}
                        </div>
                    </div>
                );
        }
    }
    render() {
        return this.renderInputComp();
    }
}

const style = {
    button: {
        publicStyle: {
            border: '1px solid #cccccc',
            lineHeight: 1,
            boderRadius: 0,
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
    input: {
        small: {
            height: 30,
            fontSize: 14,
        },
        default: {
            height: 38,
            fontSize: 16,
        },
        large: {
            height: 52,
            fontSize: 20,
        },
        blockLarge: {
            height: 52,
            fontSize: 20,
        }
    },
};

QbDropDown.defaultProps = {
    defaultData: {
        value: null,
        label: null
    }
}

export default QbDropDown;
