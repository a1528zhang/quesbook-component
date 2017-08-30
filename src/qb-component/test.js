/**
 * Created by az on 2017/7/24.
 */
import React, { Component } from 'react';
import './_default.scss';
import QbLayout from './QbLayout';
import { QbDatePicker, QbTimePicker } from './QbDatePicker';

import QbButton from './QbButton';
import QbHighlight from './QbHighlight';
import QbScore from './QbScore';
import QbStar from './QbStar';
import QbImgSection from './QbImgSection';
import {QbCheckBox, QbRadio, QbInput, QbSwitcher} from './QbInput';
import {QbModalBody, QbModalHeader, QbModalFooter, QbModal} from './QbModal';
import {QbDropDown, QbDropDownDivider, QbDropDownItem} from './QbDropDown';
import QbSlider from './QbSlider';
import { QbCard } from './QbCard';
import CloseIcon from './assets/image/icon/x-icon@3x.png';
import { QbTabs, QbTab } from './QbTabs';
import QbCollapse from './QbCollapse';
import Collapse from 'rc-collapse';
import QbMessageCard from './QbMessageCard';
import QbProgressBar from './QbProgressBar';
import 'rc-collapse/assets/index.css';
const Panel = Collapse.Panel;

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            switchState: true,
            showCard: true,
            numlist: ['yahaha'],
        }
    }
    toggleModal() {
        this.setState({
            show: !this.state.show
        });
        console.log('Tag show is, ', this.state.show);
    }
    switchHandler() {
        console.log('Tag click');
        this.setState((prevState, props) => ({ switchState: !prevState.switchState }));
    }
    messageToggle() {
        this.setState((prevState, props) => ({
            showCard: !prevState.showCard
        }));
    }
    sliderChange(lowPrice, highPrice) {
        console.log(lowPrice, highPrice);
    }
    buttonIconClick() {
        alert('icon cliasc');
    }
    dateChange(start, end) {
        console.log(start, end);
    }
    add() {
        console.log('Tag before numlist:', this.state.numlist);
        let a = this.state.numlist;
        a.push('another one');
        this.setState({
            numlist: a
        })
    }
    render() {
        const dropDownContent = [{
            label: 'abc',
            value: 'abc',
        }, {
            label: 'bcd',
            value: 'bcd',
        }, {
            label: 'cde',
            value: 'cde',
        }];
        let list = this.state.numlist.map((data) => {
            return <div>{data}</div>
        });
        console.log('Tag numlist:', this.state.numlist);
        let collapseContent = [{
            header:
            <div>
                <img src="" />
                <div style={{ color: '#ffffff' }}>hello</div>
            </div>,
            content: <div>hi</div>,
        }, {
            header:
            <div>
                <img src="" />
                <div>god</div>
            </div>,
            content: <div>like</div>
        }]
        return (
            <div>
                <QbProgressBar compStyle={{ marginBottom: '50px' }} percentage={'35%'} />
                <QbImgSection sectionType="English" style={{'height': '200px'}}></QbImgSection>
                <QbImgSection sectionType="science"></QbImgSection>

                <QbStar num="33"></QbStar>

                <QbScore score="32"></QbScore>

                <QbScore score="32" content="over all" style={{'borderColor': '#b9cff3', 'color': '#b9cff3', 'fontSize': '40px'}}></QbScore>
                <h1>
                    My StudyPlan <QbHighlight content="Quesbook Web"></QbHighlight>
                </h1>
                <QbButton label="hello"
                    className="btn btn-secondary"
                    size="small"
                    iconClick={this.buttonIconClick.bind(this)}
                    dataTarget="#modal" dataToggle='modal'>
                    <img src={CloseIcon} style={{ height: 'inherit', width: 'inherit' }} />
                </QbButton>
                <QbButton label="t"
                    className="btn btn-primary"
                    disabled={true}
                    data-toggle="modal" data-target="#modal" />
                <QbCheckBox label="hello" changeHandler={() => alert('hi')} fontStyle={{ fontSize: 16 }} />
                <QbRadio label="hello" name="1" value={1} changeHandler={(value) => console.log('hello', value)} fontStyle={{ fontSize: 16 }} />
                <QbRadio label="hi" name='1' value={2} changeHandler={(value) => console.log('hello', value)} fontStyle={{ fontSize: 16 }} />
                <QbInput size="small" changeHandler={(e) => alert(e.target.value)}>
                    @
                </QbInput>
                <QbModal target="modal" >
                    <QbModalHeader>
                        <div>header</div>
                    </QbModalHeader>
                    <QbModalBody>
                        <div>body</div>
                    </QbModalBody>
                    <QbModalFooter>
                        <QbButton label="close" dataTarget="#modal" dataToggle='modal' />
                    </QbModalFooter>
                </QbModal>
                npm
                <QbDropDown inputType="input" btnStyle={{width: 350, textAlign: 'left'}}
                            dropdownStyle={{width: 400}} compStyle={{position: 'relative', width: 400}}
                            size="large"
                            content ={dropDownContent} onChange={(data)=> {
                                console.log('TAg data:', data);
                                this.setState({
                                    show: !this.state.show
                                });
                }}/>
                <QbSwitcher switchState={this.state.switchState} clickHandler={this.switchHandler.bind(this)}/>
                <QbTimePicker ensureTime={(time)=> console.log('Tag time is:', time)} size="large"
                              btnStyle={{width: 100, height: 52, fontSize: 20}}/>
                <QbDatePicker onDatesChange = {this.dateChange.bind(this)} style={{width: 500}}/>
                <QbButton label="show message"
                    className="btn dark alternate"
                    size="large"
                    clickHandler={this.messageToggle.bind(this)} />
                <QbMessageCard display={this.state.showCard}
                    title="hello!"
                    content="ha lou a !"
                    onCancelClick={this.messageToggle.bind(this)} />
                <QbSlider maxMark="$10+"
                    minMark="Free!"
                    maxPrice={15}
                    style={{ height: 100, width: 300 }}
                    changeHandler={this.sliderChange.bind(this)} />
                <QbCard cardStyle={{ height: 120, width: 500 }} avatarSrc={CloseIcon} rate={3.5} />
                <button onClick={this.add.bind(this)}>add</button>
                <QbTabs>
                    <QbTab ref="hlo">
                        {list}
                    </QbTab>
                    <QbTab ref="bin">
                        <div>asd</div>
                    </QbTab>
                    <QbTab ref="ho" className="new" style={{ height: 50, overflowY: 'scroll' }}>
                        <div>xixiix</div>
                        <div>xixiix</div>
                        <div>xixiix</div>
                        <div>xixiix</div>
                        <div>xixiix</div>
                        <div>xixiix</div>
                        <div>xixiix</div>
                        <div>xixiix</div>
                        <div>xixiix</div>
                    </QbTab>
                </QbTabs>
                <QbCollapse content={collapseContent}
                    panelStyle={{ color: '#ffffff', background: '#203a62' }} />
            </div>
        )
    }
}
