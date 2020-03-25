import React from 'react';

export default ({
    style = {},
    fill= '#737983',
    width = '100%',
    height = '100%',
    viewBox = '0 0 10 10'
}) => 
    <svg
        width={width}
        height={height}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path className="st0" d="M0,5.3l0-0.6c0-0.2,0.1-0.3,0.3-0.3h9.4c0.2,0,0.3,0.1,0.3,0.3v0.6c0,0.2-0.1,0.3-0.3,0.3H0.3
            C0.1,5.6,0,5.5,0,5.3z" fill={fill} />
        <path className="st0" d="M5.3,10H4.7c-0.2,0-0.3-0.1-0.3-0.3V0.3C4.4,0.1,4.5,0,4.7,0l0.6,0c0.2,0,0.3,0.1,0.3,0.3v9.4
            C5.6,9.9,5.5,10,5.3,10z" fill={fill} />
    </svg>