import React from "react";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Buttons.css';

//Button returns a button with two possible types: flat, raised or round
export default function Button({
    text, link, type, icon
}) {
    //link, text and type are passed through props to this component
    if ((typeof link === 'string' && typeof type === 'string')) {
        if (icon && typeof icon === 'string') {
            if (type === 'flat-icon') {
                if (link.startsWith('/')) {
                    return (
                        <Link className="button-flat icon" to={link}>
                            {text ? <span>{text}</span> : null}
                            <span className="iconify" data-icon={icon}></span>
                        </Link>
                    )
                } else if (link.startsWith('http', 0)) {
                    return (
                        <a className="button-flat icon" href={link} target="_blank" rel="noreferrer">
                            {text ? <span>{text}</span> : null}
                            <Icon icon={icon} />
                        </a>
                    )
                }
            } else if (type === 'raised-icon') {
                if (link.startsWith('/')) {
                    return (
                        <Link className="button-raised icon" to={link}>
                            {text ? <span>{text}</span> : null}
                            <span className="iconify" data-icon={icon}></span>
                        </Link>
                    )
                } else if (link.startsWith('http', 0)) {
                    return (
                        <a className="button-raised icon" href={link} target="_blank" rel="noreferrer">
                            {text ? <span>{text}</span> : null}
                            <Icon icon={icon} />
                        </a>
                    )
                }
            } else if (type === 'round') {
                return (
                    <Link className="button-round" to={link}>
                        <Icon icon={icon} />
                    </Link>
                )
            } else {
                return null;
            }
        } else {
            if (type === 'flat') {
                return (
                    <Link className="button-flat" to={link}>
                        <span>{text}</span>
                    </Link>
                )
            } else if (type === 'raised') {
                return (
                    <Link className="button-raised" to={link}>
                        <span>{text}</span>
                    </Link>
                )
            } else {
                return null;
            }
        }
    } else {
        return null;
    }
}