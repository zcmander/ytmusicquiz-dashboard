import React from "react";

import { useSpring, animated } from 'react-spring'

interface FullscreenTextProps {
    text: string;
}

export const FullscreenText: React.SFC<FullscreenTextProps> = (props) =>
{
    const animationProps = useSpring({opacity: 1, from: {opacity: 0}})

    return <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12">
            <animated.h1 style={animationProps} className="text-center">{props.text}</animated.h1>
        </div>
    </div>;
}