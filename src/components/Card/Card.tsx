import React from "react";
import './Card.css'

type CardProps = {
    children: React.ReactNode;
    className: string;
}

const Card = (props : CardProps) => {
    return <div className={`${'card_universal'} ${props.className}`}>
        {props.children}
    </div>
};

export default Card;