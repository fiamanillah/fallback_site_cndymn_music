import Image from 'next/image';
import React from 'react';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    return (
        <div className="flex items-center gap-1 text-left">
            <Image
                src={'/svgs/logo.svg'}
                width={100}
                height={100}
                className={`${size === 'sm' ? 'size-8' : size === 'lg' ? 'size-12' : 'size-10'}`}
                alt="The Resident Creator"
            />
            <h1
                className={`${
                    size === 'sm'
                        ? 'text-lg leading-4'
                        : size === 'lg'
                        ? 'text-2xl leading-4'
                        : 'text-xl leading-5'
                } font-semibold`}
            >
                The Resident <br /> Creator <sup className="text-xs font-medium">TM</sup>
            </h1>
        </div>
    );
}
