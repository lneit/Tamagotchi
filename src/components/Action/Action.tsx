import React from 'react';
import './Action.css';

interface ActionProps {
    name: string,
    onAction?: () => void,
    disable: boolean
}

const Action: React.FC<ActionProps> = ({
    name,
    onAction,
    disable
}) => {
    const actionSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if(onAction) {
            onAction();
        }
    };

    return <form onSubmit={actionSubmitHandler}>
        <div>
            <button type="submit" disabled={disable}>{name}</button>
        </div>
    </form>;
};

export default Action;