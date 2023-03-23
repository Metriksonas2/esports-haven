import React from 'react';

const Heading = ({ title, subtitle }) => {
    return (
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                {title}
            </h2>
            <p className="font-light text-gray-500 sm:text-xl">
                {subtitle}
            </p>
        </div>
    );
}

export default Heading;