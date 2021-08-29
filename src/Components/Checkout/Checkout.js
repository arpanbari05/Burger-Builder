import React from 'react';
import Modal from '../../Containers/Burger/Modal/Modal';
import './Checkout.css';
import Button from '../Button/Button.js';

const Checkout = ( props ) => {
    return (
        <div >
            <Modal purchasing={props.isPurchasing}>
                <h3>Checkout</h3>
                <p>Following ingredients in your delicious burger:</p>
                <ul>
                    {
                        Object.keys(props.ingredients).map(igKeys => {
                            return <li key={igKeys}>{igKeys}:<span
                            style={{ fontWeight: 'bold' }}> {props.ingredients[igKeys]} </span></li>
                        })
                    }
                </ul>
                <h4>Total bill of your burger: ${props.price.toFixed(2)}</h4>
                <p>Continue to pay:</p>
                <Button clicked={props.continuePurchase} type={'continue'}>CONTINUE</Button>
                <Button clicked={props.cancelPurchase} type={'cancel'}>CANCEL</Button>
            </Modal>
        </div>
    );
}

export default Checkout;