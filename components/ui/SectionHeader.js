import React from 'react'

/**
 * Reusable section header with optional subtitle tag, heading, and description.
 * Supports highlighting a word in the heading with emerald accent color via `highlight` prop.
 */
export default function SectionHeader({ id, tag, heading, highlight, description }) {
  // Split heading around the highlight word(s) to apply accent color
  const renderHeading = () => {
    if (!highlight || !heading.includes(highlight)) {
      return heading
    }
    const parts = heading.split(highlight)
    return (
      <>
        {parts[0]}<span className="text-emerald-400">{highlight}</span>{parts[1]}
      </>
    )
  }

  return (
    <div className="text-center mb-16">
      {tag && (
        <p className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">
          {tag}
        </p>
      )}
      <h2 id={id} className="text-4xl md:text-5xl font-bold text-white mb-4">
        {renderHeading()}
      </h2>
      {description && (
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
