# Spec: cn-unit-tests

## Purpose

Define the expected behavior of the `cn` utility function used throughout the library to compose CSS class names. The function merges multiple class name arguments into a single string, filtering out falsy values and supporting conditional expressions.

## Requirements

### Requirement: cn combina clases correctamente
La función `cn` SHALL concatenar múltiples strings de clases CSS en un único string separado por espacios.

#### Scenario: Múltiples strings
- **WHEN** se llama `cn('foo', 'bar')`
- **THEN** retorna `'foo bar'`

### Requirement: cn filtra valores falsy
La función `cn` SHALL ignorar valores `undefined`, `null`, `false` y strings vacíos al construir el resultado.

#### Scenario: Argumento undefined
- **WHEN** se llama `cn('foo', undefined)`
- **THEN** retorna `'foo'` sin espacios extra

#### Scenario: Argumento false
- **WHEN** se llama `cn('foo', false && 'bar')`
- **THEN** retorna `'foo'`

### Requirement: cn soporta clases condicionales
La función `cn` SHALL aceptar expresiones condicionales como `condition && 'class'` y solo incluir la clase si la condición es verdadera.

#### Scenario: Condición verdadera
- **WHEN** se llama `cn('base', true && 'active')`
- **THEN** retorna `'base active'`

#### Scenario: Condición falsa
- **WHEN** se llama `cn('base', false && 'active')`
- **THEN** retorna `'base'`
