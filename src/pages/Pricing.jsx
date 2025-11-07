import React, { useEffect, useState } from 'react'
import dataJson from '../data/pricing.json'

const Section = ({ title, items }) => (
  <section>
    <div className="section-title"><span className="dot"></span><h2>{title}</h2></div>
    <div className="grid">
      {items.map((it, idx) => (
        <div key={idx} className="card col-6">
          <h3>{it.name}</h3>
          <p>{it.desc}</p>
          <p className="price">Цена: {it.price}</p>
        </div>
      ))}
    </div>
  </section>
)

const Pricing = () => {
  const [data] = useState(dataJson)

  return (
    <div className="hero">
      <h1>Ценовник на услуги</h1>
      {data.sections.map((sec, i) => (
        <Section key={i} title={sec.title} items={sec.items} />
      ))}

      <div className="card">
        <h3>Попусти и забелешки</h3>
        <ul className="list">
          {data.notes.map((n, i) => <li key={i} className="note">{n}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default Pricing
