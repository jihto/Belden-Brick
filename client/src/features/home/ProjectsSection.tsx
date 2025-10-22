'use client'

import React, { useState, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, imageReveal } from '@/utils/animations';

interface Project {
    id: number;
    name: string;
    location: string;
    area: string;
    year: string;
    image: string;
    type?: string;
    description?: string;
}

export default function ProjectsSection() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const projects: Project[] = [
        {
            id: 1,
            name: "VPBANK TOWER",
            location: "Hà Nội",
            area: "45,000 m²",
            year: "2024",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
            type: "main",
            description: "Tòa nhà văn phòng cao cấp với thiết kế hiện đại"
        },
        {
            id: 2,
            name: "VIETCOMBANK TOWER",
            location: "TP.HCM",
            area: "38,000 m²",
            year: "2024",
            image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80",
            type: "side"
        },
        {
            id: 3,
            name: "TTC ARGIS",
            location: "Bình Dương",
            area: "25,000 m²",
            year: "2023",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
            type: "side"
        }
    ];

    return (
        <div ref={ref} className="bg-green-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    className="flex items-center justify-between mb-8"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                >
                    <motion.div 
                        className="flex items-center gap-3"
                        variants={staggerItem}
                    >
                        <motion.h2 
                            className="text-4xl font-bold text-green-600 uppercase"
                            variants={fadeInLeft}
                        >
                            Dự Án & Video
                        </motion.h2>
                    </motion.div>
                    <motion.a 
                        href="/projects" 
                        className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
                        variants={fadeInRight}
                        whileHover={{ x: 5 }}
                    >
                        XEM THÊM <ArrowRight size={18} />
                    </motion.a>
                </motion.div>

                {/* Projects Grid */}
                <motion.div 
                    className="grid md:grid-cols-2 gap-4"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                >
                    {/* Main Project - Large */}
                    <motion.div 
                        className="relative group overflow-hidden row-span-2 h-[500px]"
                        variants={fadeInLeft}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img
                            src={projects[0].image}
                            alt={projects[0].name}
                            className="w-full h-full object-cover"
                            variants={imageReveal}
                        />
                        
                        {/* Dark gradient overlay at bottom for text readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
                        
                        {/* Project name overlay */}
                        <motion.div 
                            className="absolute bottom-4 left-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h3 className="text-white text-2xl font-bold">
                                {projects[0].name}
                            </h3>
                        </motion.div>
                    </motion.div>

                    {/* Side Projects */}
                    <motion.div 
                        className="grid grid-rows-2 gap-4"
                        variants={staggerContainer}
                    >
                        {projects.slice(1).map((project, index) => (
                            <motion.div 
                                key={project.id} 
                                className="relative group overflow-hidden h-[240px]"
                                variants={fadeInRight}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img 
                                    src={project.image} 
                                    alt={project.name} 
                                    className="w-full h-full object-cover"
                                    variants={imageReveal}
                                />
                                
                                {/* Dark gradient overlay at bottom for text readability */}
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
                                
                                {/* Project name overlay */}
                                <motion.div 
                                    className="absolute bottom-3 left-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                >
                                    <h3 className="text-white text-lg font-bold">
                                        {project.name}
                                    </h3>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}