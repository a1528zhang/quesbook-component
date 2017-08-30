/**
 * Created by az on 2017/7/12.
 */
import React, {Component} from 'react';

class QbInput extends Component {
    render() {
        const {placeHolder, className, size, style, changeHandler, children} = this.props;
        let height = 38;
        switch (size) {
            case 'small':
                height = 32;
                break;
            case 'default':
                height = 38;
                break;
            case 'large':
                height = 51;
                break;
        }
        let finallClass = className? finallClass = className +' form-control': 'form-control';
        let inputClass = '';
        let additionButton = null;
        if (children) {
            inputClass = 'input-group';
            additionButton = (
                <span className="input-group-addon" style={{borderRight: 0, background: '#ffffff'}}>{children}</span>
            );
        }
        return (
            <div style={{height: height}} className={inputClass}>
                {additionButton}
                <input type='text'
                             className={finallClass}
                             placeholder={placeHolder}
                             onChange={(e)=> {
                                 changeHandler.bind(this)(e);
                             }}
                             style={{...style, ...privateStyle.input, height}}/>
            </div>
        );
    }
}

const privateStyle = {
    input: {
    }
};

export default QbInput;