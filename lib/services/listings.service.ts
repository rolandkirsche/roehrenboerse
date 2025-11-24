import { supabase } from '@/lib/supabase'

export type Listing = {
  id: number
  title: string
  tags: string[]
  price: string
  location: string
  label?: string
  category: string
  created_at?: string
  user_id?: string
}

export type CreateListingInput = Omit<Listing, 'id' | 'created_at'>

/**
 * Fetch all listings from Supabase
 */
export async function getListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch listings: ${error.message}`)
  }

  return data as Listing[]
}

/**
 * Fetch a single listing by ID
 */
export async function getListingById(id: number) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch listing: ${error.message}`)
  }

  return data as Listing
}

/**
 * Create a new listing
 */
export async function createListing(listing: CreateListingInput) {
  const { data, error } = await supabase
    .from('listings')
    .insert(listing)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create listing: ${error.message}`)
  }

  return data as Listing
}

/**
 * Update an existing listing
 */
export async function updateListing(id: number, updates: Partial<CreateListingInput>) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update listing: ${error.message}`)
  }

  return data as Listing
}

/**
 * Delete a listing
 */
export async function deleteListing(id: number) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete listing: ${error.message}`)
  }

  return true
}

/**
 * Search listings by query
 */
export async function searchListings(query: string) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .or(`title.ilike.%${query}%,tags.cs.{${query}}`)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to search listings: ${error.message}`)
  }

  return data as Listing[]
}

/**
 * Filter listings by category
 */
export async function getListingsByCategory(category: string) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch listings by category: ${error.message}`)
  }

  return data as Listing[]
}
