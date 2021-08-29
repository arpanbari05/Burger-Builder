import React, { Component } from 'react';
import classes from './Modal.css';

class Modal extends Component {

    shouldComponentUpdate(nextProp, nextState) {
        return nextProp.purchasing !== this.props.purchasing;
    }

    render () {
        return (
            <div className={classes.Modal}
            style={
                {
                    transform: this.props.purchasing ? 'translate(-50%, -50%)' : 'translate(-50%, -100vh)',
                    opacity: this.props.purchasing ? '1' : '0'
                }
            }
            >
                {this.props.children}
            </div>
        );
    }
    
}

export default Modal;