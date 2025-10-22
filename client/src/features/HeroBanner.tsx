import Image from 'next/image';
import React from 'react'

interface HeroBannerProps {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
    title = "Welcome to Our Farm",
    subtitle = "Fresh, Organic Produce Delivered to Your Doorstep",
    backgroundImage = "/images/hero-banner.jpg"
}) => {
    return (
        <section className="relative h-56 md:h-80">
            <div className="absolute inset-0">
                <Image
                    width={200}
                    height={200}
                    src={backgroundImage}
                    alt={title || ''}
                    className="w-full h-full object-cover object-center"
                />
                    <div className="absolute inset-0 bg-black/50 bg-opacity-50" />
            </div>
            <div className="absolute inset-0 z-10 w-full h-full max-w-7xl grid justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div className="text-center">
                    <div className="mb-4"> 
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">{title}</h1>
                    </div>
                    <p className="text-base sm:text-xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner