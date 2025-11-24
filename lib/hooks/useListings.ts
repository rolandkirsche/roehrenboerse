'use client'

import { useState, useEffect } from 'react'
import type { Listing, CreateListingInput } from '@/lib/services/listings.service'

/**
 * Client-side hook für Listings (für Client Components)
 */
export function useListings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/listings')
      if (!response.ok) throw new Error('Failed to fetch listings')
      const data = await response.json()
      setListings(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const createListing = async (listing: CreateListingInput) => {
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
      })
      if (!response.ok) throw new Error('Failed to create listing')
      const newListing = await response.json()
      setListings([newListing, ...listings])
      return newListing
    } catch (err) {
      throw err
    }
  }

  const updateListing = async (id: number, updates: Partial<CreateListingInput>) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update listing')
      const updatedListing = await response.json()
      setListings(listings.map(l => l.id === id ? updatedListing : l))
      return updatedListing
    } catch (err) {
      throw err
    }
  }

  const deleteListing = async (id: number) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete listing')
      setListings(listings.filter(l => l.id !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    listings,
    loading,
    error,
    createListing,
    updateListing,
    deleteListing,
    refetch: fetchListings,
  }
}
