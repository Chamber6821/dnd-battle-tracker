import { Action } from 'app/store';

const prefix = 'dnd-battle-tracker/game/'
const CHANGE_NAME = prefix + 'CHANGE_NAME'
const ADD_CHARACTER = prefix + 'ADD_CHARACTER'
const REMOVE_CHARACTER = prefix + 'REMOVE_CHARACTER'
const SET_CHARACTERS = prefix + 'SET_CHARACTERS'

const types = [CHANGE_NAME, ADD_CHARACTER, REMOVE_CHARACTER, SET_CHARACTERS]
type ActionType = typeof types[number]

export interface Game {
    readonly name: string,
    readonly characters: Array<Character>
}

export interface Character {
    readonly name: string,
    readonly initiativeModifier: number
    readonly rolledInitiative: number
}

const initState: Game = {
    name:       'Default',
    characters: []
}

export default function reducer(state: Game = initState, action: Action<ActionType, any>): Game {
    switch (action.type) {
        case CHANGE_NAME: return {...state, name: action.payload}
        case SET_CHARACTERS: return {...state, characters: action.payload}
        case ADD_CHARACTER: return {...state, characters: [...state.characters, action.payload]}
        case REMOVE_CHARACTER: return {...state, characters: state.characters.filter((_, index) => index !== action.payload)}
        default: return state
    }
}

export function changeName(name: string): Action<typeof CHANGE_NAME, string> {
    return { type: CHANGE_NAME, payload: name }
}

export function setCharacters(characters: Array<{ name: string, initiativeModifier: number }>):
    Action<typeof SET_CHARACTERS, Array<Character>> {
    return {
        type: SET_CHARACTERS, payload: characters.map(
            ({ name, initiativeModifier }) => ({ name, initiativeModifier, rolledInitiative: 0 }))
    }
}

export function addCharacter(name: string, initiativeModifier: number): Action<typeof ADD_CHARACTER, Character> {
    return { type: ADD_CHARACTER, payload: { name, initiativeModifier, rolledInitiative: 0 } }
}

export function removeCharacter(index: number): Action<typeof REMOVE_CHARACTER, number> {
    return { type: REMOVE_CHARACTER, payload: index }
}
