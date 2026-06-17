import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('combina múltiples strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('filtra undefined', () => {
    expect(cn('foo', undefined)).toBe('foo')
  })

  it('filtra null', () => {
    expect(cn('foo', null)).toBe('foo')
  })

  it('filtra false', () => {
    expect(cn('foo', false)).toBe('foo')
  })

  it('incluye clase cuando condición es verdadera', () => {
    expect(cn('base', true && 'active')).toBe('base active')
  })

  it('excluye clase cuando condición es falsa', () => {
    expect(cn('base', false && 'active')).toBe('base')
  })
})
