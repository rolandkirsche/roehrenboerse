import { supabase } from './supabase'

/**
 * Einfache Hilfsfunktionen für Supabase-Datenbankoperationen
 */

// Daten abrufen
export async function fetchListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fehler beim Laden:', error)
    return []
  }

  return data
}

// Daten schreiben
export async function createListing(listing: {
  title: string
  tags: string[]
  price: string
  location: string
  label?: string
  category: string
}) {
  const { data, error } = await supabase
    .from('listings')
    .insert(listing)
    .select()
    .single()

  if (error) {
    console.error('Fehler beim Erstellen:', error)
    return null
  }

  return data
}

// Daten aktualisieren
export async function updateListing(id: number, updates: any) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Fehler beim Aktualisieren:', error)
    return null
  }

  return data
}

// Daten löschen
export async function deleteListing(id: number) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Fehler beim Löschen:', error)
    return false
  }

  return true
}
