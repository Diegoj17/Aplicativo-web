"use client"

import { useRef, useEffect } from "react"

// Componente envoltorio que permite desplazamiento con el mouse
function ScrollableContainer({ children }) {
  const containerRef = useRef(null)
  const isMouseDown = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const scrollLeft = useRef(0)
  const scrollTop = useRef(0)

  useEffect(() => {
    const container = containerRef.current

    // Función para manejar el inicio del arrastre
    const handleMouseDown = (e) => {
      isMouseDown.current = true
      startX.current = e.pageX - container.offsetLeft
      startY.current = e.pageY - container.offsetTop
      scrollLeft.current = container.scrollLeft
      scrollTop.current = container.scrollTop

      // Cambiar el cursor para indicar que se puede arrastrar
      container.style.cursor = "grabbing"
    }

    // Función para manejar el fin del arrastre
    const handleMouseUp = () => {
      isMouseDown.current = false
      container.style.cursor = "grab"
    }

    // Función para manejar el movimiento del mouse
    const handleMouseMove = (e) => {
      if (!isMouseDown.current) return
      e.preventDefault()

      // Calcular la nueva posición de desplazamiento
      const x = e.pageX - container.offsetLeft
      const y = e.pageY - container.offsetTop
      const walkX = (x - startX.current) * 1.5 // Multiplicador para ajustar la velocidad
      const walkY = (y - startY.current) * 1.5

      // Aplicar el desplazamiento
      container.scrollLeft = scrollLeft.current - walkX
      container.scrollTop = scrollTop.current - walkY
    }

    // Agregar event listeners
    container.addEventListener("mousedown", handleMouseDown)
    container.addEventListener("mouseup", handleMouseUp)
    container.addEventListener("mouseleave", handleMouseUp)
    container.addEventListener("mousemove", handleMouseMove)

    // Establecer el cursor inicial
    container.style.cursor = "grab"

    // Limpiar event listeners al desmontar
    return () => {
      container.removeEventListener("mousedown", handleMouseDown)
      container.removeEventListener("mouseup", handleMouseUp)
      container.removeEventListener("mouseleave", handleMouseUp)
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        position: "relative",
      }}
    >
      {children}
    </div>
  )
}

export default ScrollableContainer

