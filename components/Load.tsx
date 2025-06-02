'use client'

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-16 h-16 border-4 border-red border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  )
}
