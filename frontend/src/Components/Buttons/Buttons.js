import React from "react";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Buttons.css';

//Button returns a button with three possible types: flat, raised or round
export default function Button({
    text, link, type, icon, onClick, tooltip
}) {
    //link, text, type, icon, onClick and tooltip are passed through props to this component
    if ((typeof link === 'string' && typeof type === 'string')) {
        //Makes sure link passed is a valid string
        if (icon && typeof icon === 'string') {
            //Checks if an icon was passed and is a valid string
            if (type === 'flat-icon') {
                if (link.startsWith('/') || link === '') {
                    //For local or empty links, a react-router link as a button is returned with its provided icon
                    return (
                        <button className='button' onClick={onClick}>
                            <Link className="button-flat icon" to={link}>
                                {text ? <span>{text}</span> : null}
                                <span className="iconify" data-icon={icon}></span>
                            </Link>
                        </button>
                    )
                } else if (link.startsWith('http', 0)) {
                    //For remote links, an a element is returned with the icon provided
                    return (
                        <a className="button-flat icon" href={link} target="_blank" rel="noreferrer">
                            {text ? <span>{text}</span> : null}
                            <Icon icon={icon} />
                        </a>
                    )
                }
                //Same checking for the raised with icon type button
            } else if (type === 'raised-icon') {
                if (link.startsWith('/') || link === '') {
                    return (
                        <button className='button' onClick={onClick}>
                            <Link className="button-raised icon" to={link}>
                                {text ? <span>{text}</span> : null}
                                <Icon icon={icon} />
                            </Link>
                        </button>
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
                //For a round icon, only a react-router link with an icon is returned. No text included.
                return (
                    <button className='button' onClick={onClick}>
                        <Link className="button-round tooltip" to={link}>
                            <Icon icon={icon} />
                            {(tooltip && tooltip !== '')
                                ? <span className="tooltip_text">{tooltip}</span>
                                : null}
                        </Link>
                    </button>
                )
                //An icon was passed as prop but button name is not correct type
            } else {
                console.log('Wrong button type was passed to Button component');
                return null;
            }
            //Same functionality and ckeckings as with icon-included buttons but for only text buttons
        } else {
            if (type === 'flat') {
                if (link.startsWith('#')) {
                    return (
                        <button className='button' onClick={onClick}>
                            <a className="button-flat" href={link}>
                                <span>{text}</span>
                            </a>
                        </button>
                    )
                } else {
                    return (
                        <button className='button' onClick={onClick}>
                            <Link className="button-flat" to={link}>
                                <span>{text}</span>
                            </Link>
                        </button>
                    )
                }
            } else if (type === 'raised') {
                if (link.startsWith('#')) {
                    return (
                        <button className='button' onClick={onClick}>
                            <a className="button-raised" href={link}>
                                <span>{text}</span>
                            </a>
                        </button>
                    )
                } else {
                    return (
                        <button className='button' onClick={onClick}>
                            <Link className="button-raised" to={link}>
                                <span>{text}</span>
                            </Link>
                        </button>
                    )
                }
                //Returns null for no rendering of the button
            } else {
                console.error('Unknown button type or missing icon for icon-type Button!');
                return null;
            }
        }
        //Returns null for no rendering of the button
    } else {
        console.error(`Button's link or type should be strings only for Button component`);
        return null;
    }
}