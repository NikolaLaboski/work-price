// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react'

const FORM_ENDPOINT = "https://formspree.io/f/xanawnbr";
const INSTAGRAM_URL = "https://www.instagram.com/weblab.mk93/";

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ sending: false, ok: null, msg: '' })
  const [showSuccess, setShowSuccess] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setStatus({ sending: true, ok: null, msg: '' })
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      })
      if (res.ok) {
        setStatus({ sending: false, ok: true, msg: "✅ Пораката е успешно испратена. Ти благодарам!" })
        setForm({ name: '', email: '', message: '' })
        setShowSuccess(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus({
          sending: false,
          ok: false,
          msg: data?.error || "❌ Настана грешка при испраќањето. Обиди се повторно."
        })
      }
    } catch (err) {
      setStatus({ sending: false, ok: false, msg: "⚠️ Нема мрежа или сервисот е недостапен. Обиди се пак." })
    }
  }

  // ⏱️ Автоматско сокривање на success порака после 4 секунди
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  return (
    <div className="hero">
      <h1>Контакт</h1>

      <div className="card">
        <form className="contact-form" onSubmit={onSubmit}>
          {/* honeypot за спам-ботови (невидливо поле) */}
          <input
            type="text"
            name="_gotcha"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            onChange={() => {}}
          />

          <input
            name="name"
            placeholder="Име и презиме"
            value={form.name}
            onChange={onChange}
            required
          />
          <input
            name="email"
            placeholder="Е-пошта"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Порака"
            value={form.message}
            onChange={onChange}
            required
          />

          <button type="submit" disabled={status.sending}>
            {status.sending ? "Се испраќа..." : "Испрати порака"}
          </button>

          {status.ok === false && (
            <p className="note" style={{ marginTop: 8, color: 'red' }}>
              {status.msg}
            </p>
          )}
        </form>
      </div>

      {showSuccess && (
        <div
          style={{
            marginTop: 20,
            padding: '10px 20px',
            backgroundColor: '#e6ffe6',
            border: '1px solid #4CAF50',
            borderRadius: '10px',
            color: '#2e7d32',
            fontWeight: '500',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          ✅ Пораката е успешно испратена!
        </div>
      )}

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Социјални мрежи</h3>
        <a className="nav-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          👉 Instagram профил
        </a>
      </div>
    </div>
  )
}

export default Contact
