/**
 * Types for our Redux store
 *
 * @see {@link https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript}
 */
// Extract a specific action from a list of actions based on it's Type string
type ExtractAction<A, T> = Extract<A, { type: T }>

// Exclude the "type" field from an object
type ExcludeTypeField = { [K in Exclude<keyof A, 'type'>]: A[K] }

// If there are no params left after you exclude the "type" key,
// then don't force the user to provide a payload (since {type: 'SOMETHING'} without payload works)
type ExtractSimpleAction<A> = A extends any
  ? {} extends ExcludeTypeField<A>
    ? A
    : never
  : never

namespace Store {
  // Type and payloads for all actions in the Redux framework
  // type Actions =
    // | import('../store/authentication/actions').Actions

  // List of all types strings
  type Types = Actions['type']

  // Dispatch fn is overloaded
  // 1. Dispatch with just a type and not a payload (e.g. {type: 'SOMETHING'})
  interface Dispatch {
    <T extends Types>(x0: ExtractSimpleAction<Actions>): void
  }
  // 2. Dispatch with just a type AND a payload (e.g. {type: 'SOMETHING', payload: { ... }})
  interface Dispatch {
    <T extends Types>(x0: ExtractAction<Actions, T>): void
  }

  // Global is just the entire state.
  type Global = NonNullable<
    Parameters<typeof import('../store/reducers').default>[0]
  >

  type GetGlobal = <S extends Global>() => S
}
