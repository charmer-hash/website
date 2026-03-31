"use client"

import { useEffect, useId, useState, type RefObject } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type Anchor = "top" | "right" | "bottom" | "left" | "center"

type Point = {
  x: number
  y: number
}

function getAnchorPoint(
  rect: DOMRect,
  containerRect: DOMRect,
  anchor: Anchor,
  xOffset = 0,
  yOffset = 0
): Point {
  const left = rect.left - containerRect.left
  const top = rect.top - containerRect.top

  switch (anchor) {
    case "top":
      return { x: left + rect.width / 2 + xOffset, y: top + yOffset }
    case "right":
      return {
        x: left + rect.width + xOffset,
        y: top + rect.height / 2 + yOffset,
      }
    case "bottom":
      return {
        x: left + rect.width / 2 + xOffset,
        y: top + rect.height + yOffset,
      }
    case "left":
      return { x: left + xOffset, y: top + rect.height / 2 + yOffset }
    case "center":
    default:
      return {
        x: left + rect.width / 2 + xOffset,
        y: top + rect.height / 2 + yOffset,
      }
  }
}

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null> // Container ref
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  fromAnchor?: Anchor
  toAnchor?: Anchor
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  repeat?: number
  repeatDelay?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
  beamLength?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  fromAnchor = "center",
  toAnchor = "center",
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  beamLength,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const start = getAnchorPoint(
          rectA,
          containerRect,
          fromAnchor,
          startXOffset,
          startYOffset
        )
        const end = getAnchorPoint(
          rectB,
          containerRect,
          toAnchor,
          endXOffset,
          endYOffset
        )

        const deltaX = end.x - start.x
        const deltaY = end.y - start.y
        const distance = Math.hypot(deltaX, deltaY) || 1
        const normalX = -deltaY / distance
        const normalY = deltaX / distance
        const direction = reverse ? -1 : 1
        const controlX = start.x + deltaX / 2 + normalX * curvature * direction
        const controlY = start.y + deltaY / 2 + normalY * curvature * direction
        const d = `M ${start.x},${start.y} Q ${controlX},${controlY} ${end.x},${end.y}`
        setPathD(d)
      }
    }

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updatePath()
    })

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Call the updatePath initially to set the initial path
    updatePath()

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    fromAnchor,
    toAnchor,
    curvature,
    reverse,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat,
            repeatDelay,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop
            offset={beamLength ? `${Math.min(Math.max(beamLength, 8), 48)}%` : undefined}
            stopColor={gradientStartColor}
          ></stop>
          <stop
            offset={beamLength ? `${Math.min(Math.max(beamLength + 12, 20), 68)}%` : "32.5%"}
            stopColor={gradientStopColor}
          ></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
