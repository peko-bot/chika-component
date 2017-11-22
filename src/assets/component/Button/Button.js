import React from 'react'

import './css/Button.css'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        type: 'primary',
        text: 'test',
        width: 50,
        height: 28,
    }

    handle_click = (e) => {
        const {onChange} = this.props;
        if (onChange) onChange(e);
    }
    
    render() {
        const {text, type, children, style, width, height} = this.props;

        return (
            <div className='Button' style={style?style:{width, height}}>
                <button className={`common ${type}`} onClick={this.handle_click}>
                    <span>{children === undefined ? text : children}</span>
                </button>
            </div>
        )
    }
}