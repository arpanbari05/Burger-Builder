import React from 'react';
import classes from './Input.css';

const Input = ( props ) => {

    let inputClasses = [classes.InputElement];

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let inputElement = null;

    switch ( props.inputtype ) {
        case 'input':
            inputElement = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />
            break;

        case 'textarea':
            inputElement = <textarea 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />
            break;

        case 'select': 
            inputElement = 
            <select className={classes.InputElement}
            onChange={props.changed}>
               { 
                props.elementConfig.options.map(option => {
                        return <option key={option.value}
                        value={option.value}>
                            {option.displayValue}
                        </option>
                    })
               }
            </select>
            break;

        default: 
            inputElement = 
            <input className={classes.InputElement} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />
            break;
    }

    return (
        <div className={classes.Input}>
            { inputElement }
        </div>
    )
}

export default Input;