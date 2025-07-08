'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

type ScrollSmootherProviderProps = {
    children: React.ReactNode
}

const ScrollSmootherProvider: React.FC<ScrollSmootherProviderProps> = ({ children }) => {
    const wrapper = useRef<HTMLDivElement>(null)
    const smoother = useRef<ScrollSmoother | null>(null)

    const scrollTo = () => {
        if (smoother.current) {
            smoother.current.scrollTo('.box-c', true, 'center center')
        }
    }
    useGSAP(() => {
        if (!smoother.current && wrapper.current) {
            smoother.current = ScrollSmoother.create({
                wrapper: '#smooth-wrapper',
                content: '#smooth-content',
                smooth: 1.5,
                effects: true,
                normalizeScroll: true,
            })
        }

        ScrollTrigger.create({
            trigger: '.box-c',
            pin: true,
            start: 'center center',
            end: '+=300',
            markers: true,
        })

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
            smoother.current?.kill()
            smoother.current = null
        }
    }, { scope: wrapper })

    return (
        <div id="smooth-wrapper" ref={wrapper}>
            <div id="smooth-content">
                {children}
            </div>
        </div>
    )
}

export default ScrollSmootherProvider
