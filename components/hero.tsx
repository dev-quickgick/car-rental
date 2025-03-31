// "use client"

// import { useEffect, useRef } from "react"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import ReservationForm from "./reservation-form"

// export default function HeroSection() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     let animationFrameId: number

//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight

//     const particles: {
//       x: number
//       y: number
//       radius: number
//       speedX: number
//       speedY: number
//     }[] = []

//     // Create particles
//     for (let i = 0; i < 50; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         radius: Math.random() * 2 + 1,
//         speedX: Math.random() * 0.5 - 0.25,
//         speedY: Math.random() * 0.5 - 0.25,
//       })
//     }

//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate)
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       ctx.fillStyle = "rgba(255, 255, 255, 0.5)"

//       particles.forEach((particle) => {
//         ctx.beginPath()
//         ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
//         ctx.fill()

//         particle.x += particle.speedX
//         particle.y += particle.speedY

//         if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
//         if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
//       })
//     }

//     animate()

//     const handleResize = () => {
//       if (!canvas) return
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }

//     window.addEventListener("resize", handleResize)

//     return () => {
//       window.removeEventListener("resize", handleResize)
//       cancelAnimationFrame(animationFrameId)
//     }
//   }, [])

//   return (
//     <div className="relative min-h-[600px] overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/placeholder.svg?height=1080&width=1920"
//           alt="Luxury car on road"
//           fill
//           className="object-cover object-center brightness-75"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-1"></div>
//       </div>

//       {/* Particle animation canvas */}
//       <canvas ref={canvasRef} className="absolute inset-0 z-2"></canvas>

//       <div className="container relative z-10 mx-auto px-4 md:px-16 pt-32 pb-20 flex flex-col lg:flex-row items-center gap-8">
//         <ReservationForm />

//         <div className="w-full lg:w-6/12"></div>

//         {/* Hero Content */}
//         <motion.div
//           className="w-full lg:w-6/12 text-white pl-0 lg:pl-12"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           <motion.h1
//             className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             Get 15% off your rental
//           </motion.h1>

//           <motion.h2
//             className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             Plan your trip now
//           </motion.h2>

//           <motion.p
//             className="text-xl mb-8"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             Experience the freedom of the open road with our premium car rentals.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//           >
//             <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
//               Explore Cars
//             </button>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Animated car silhouette */}
//       <motion.div
//         className="absolute bottom-0 right-0 z-5 opacity-20 w-full max-w-xl"
//         initial={{ x: "100%" }}
//         animate={{ x: "0%" }}
//         transition={{ duration: 1.5, ease: "easeOut" }}
//       >
//         <svg viewBox="0 0 640 512" className="w-full h-auto">
//           <path
//             fill="white"
//             d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256v112c0 17.7 14.3 32 32 32h33.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80h130.6c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1-90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
//           />
//         </svg>
//       </motion.div>
//     </div>
//   )
// }

"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ReservationForm from "./reservation-form"

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
    }[] = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative min-h-[600px] overflow-hidden bg-gray-800">
      {/* Gradient overlay instead of image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 to-gray-700"></div>

      {/* Particle animation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-2"></canvas>

      <div className="container relative z-10 mx-auto px-4 md:px-16 pt-32 pb-20 flex flex-col lg:flex-row items-center">
        {/* Removed the gap prop */}
        <ReservationForm />

        {/* Hero Content - moved closer to form */}
        <motion.div
          className="w-full lg:w-6/12 text-white pl-0 lg:pl-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get 15% off your rental
          </motion.h1>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Plan your trip now
          </motion.h2>

          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience the freedom of the open road with our premium car rentals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
              Explore Cars
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated car silhouette */}
      <motion.div
        className="absolute bottom-0 right-0 z-5 opacity-20 w-full max-w-xl"
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg viewBox="0 0 640 512" className="w-full h-auto">
          <path
            fill="white"
            d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256v112c0 17.7 14.3 32 32 32h33.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80h130.6c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1-90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
          />
        </svg>
      </motion.div>
    </div>
  )
}

