import React from "react";

import { useSpring, animated } from 'react-spring'

interface FullscreenTextProps {
    text: string;
    className?: string;
}

export const FullscreenText: React.SFC<FullscreenTextProps> = (props) =>
{
    const { className } = props;
    const animationProps = useSpring({opacity: 1, from: {opacity: 0}})

    return <div className="col-12">
        <animated.h3 style={animationProps} className={"text-center text-muted " + className}>{props.text}</animated.h3>
    </div>;
}

FullscreenText.defaultProps = {
    className: ""
};
