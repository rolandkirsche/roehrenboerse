'use client'

import { useState } from 'react'
import Modal from './ui/Modal'
import { createListing } from '@/lib/db'
import { useRouter } from 'next/navigation'

interface CreateListingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateListingModal({ isOpen, onClose }: CreateListingModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    category: 'Röhre',
    label: '',
    tags: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createListing({
        title: formData.title,
        price: formData.price,
        location: formData.location,
        category: formData.category,
        label: formData.label || undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      })

      // Formular zurücksetzen
      setFormData({
        title: '',
        price: '',
        location: '',
        category: 'Röhre',
        label: '',
        tags: ''
      })

      onClose()
      router.refresh() // Page neu laden um neue Listings anzuzeigen
    } catch (error) {
      console.error('Fehler beim Erstellen:', error)
      alert('Fehler beim Erstellen des Inserats')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Neues Inserat erstellen">
      <form onSubmit={handleSubmit} className="listing-form">
        <div className="form-group">
          <label htmlFor="title">Titel *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="rb-input"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="z.B. ECC83 / 12AX7 Telefunken"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Preis *</label>
            <input
              type="text"
              id="price"
              name="price"
              className="rb-input"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="z.B. 120 €"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategorie *</label>
            <select
              id="category"
              name="category"
              className="rb-input"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Röhre">Röhre</option>
              <option value="Endröhre">Endröhre</option>
              <option value="Verstärker">Verstärker</option>
              <option value="Messgerät">Messgerät</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Standort *</label>
          <input
            type="text"
            id="location"
            name="location"
            className="rb-input"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="z.B. Berlin · Versand möglich"
          />
        </div>

        <div className="form-group">
          <label htmlFor="label">Label (optional)</label>
          <input
            type="text"
            id="label"
            name="label"
            className="rb-input"
            value={formData.label}
            onChange={handleChange}
            placeholder="z.B. NOS, NEU, SALE"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (kommagetrennt) *</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="rb-input"
            value={formData.tags}
            onChange={handleChange}
            required
            placeholder="z.B. NOS, getestet, Privatverkauf"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
            Abbrechen
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Erstelle...' : 'Inserat erstellen'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
