"use client"

import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export default function LottiePlayer({ animationData, loop = true }: { animationData: any; loop?: boolean }) {
  return <Lottie animationData={animationData} loop={loop} />
}
