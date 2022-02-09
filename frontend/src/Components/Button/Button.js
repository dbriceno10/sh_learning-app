import React from "react";
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
    text, link, type, icon
}) {
    if ((text && link && type) &&
        (typeof text === 'string' && typeof link === 'string' && typeof type === 'string')) {
        console.log('here');
        if (icon && typeof icon === 'string') {
            console.log('here');
            if (type === 'flat-icon') {
                return (
                    <Link className="button-flat icon" to={link}>
                        <span>{text}</span>
                        <span className="iconify-inline" data-icon={icon}></span>
                    </Link>
                )
            } else if (type === 'raised-icon') {
                return (
                    <Link className="button-raised icon" to={link}>
                        <span>{text}</span>
                        <span className="iconify-inline" data-icon={icon}></span>
                    </Link>
                )
            } else if (type === 'round') {
                return (
                    <Link className="button-round" to={link}>
                        <span className="iconify" data-icon={icon}></span>
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