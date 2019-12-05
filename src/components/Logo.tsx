import React from 'react';
import { useTrail, animated } from 'react-spring'

export const Logo: React.FC = () => {
    const trail = useTrail(6, {
        from: {
            transform: 'translate3d(0,-200px,0)',
            opacity: 0
        },
        to: {
            transform: 'translate3d(0,0px,0)',
            opacity: 1
        },
        config: {
            mass: 2,
            frinction: 24,
            velocity: 0,
            tension: 500
        }
    })

    const parts = [
        {"class": "text-warning", "text": "mu"},
        {"class": "text-primary", "text": "sa"},
        {"class": "text-info", "text": "vi"},
        {"class": "text-danger", "text": "sa"},
        {"class": "text-secondary", "text": "ki"},
        {"class": "text-success", "text": "sa"},
    ];

    return <animated.h1 className="text-center display-1 my-5">
        { parts.map((part, i) => {
            return <animated.div
                className={part.class + " d-inline-block"}
                style={trail[i]}
                key={i}>
                    {part.text}
                </animated.div>
        }) }
    </animated.h1>
}