import Link from 'next/link'
import React from 'react'

const Cta = () => {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-50 text-center ">
        <h2 className="text-3xl md:text-4xl font-bold merriweather">
          Plan Your Journey to Uttarakhand
        </h2>
        <p className="text-lg mt-2 merriweather">Embark on an unforgettable adventure</p>
        <Link
          href="https://www.google.com/maps?q=Uttarakhand"
          target="_blank"
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </Link>
      </section>
    </div>
  )
}

export default Cta