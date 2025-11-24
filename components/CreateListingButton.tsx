'use client'

import { useState } from 'react'
import CreateListingModal from './CreateListingModal'

export default function CreateListingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
        Inserat erstellen
      </button>
      <CreateListingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
