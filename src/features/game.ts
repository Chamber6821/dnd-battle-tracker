import { combineReducers }     from '@reduxjs/toolkit';
import { Action, EmptyAction } from 'app/store';

type GameAction = ReturnType<typeof changeName> |
    ReturnType<typeof setCharacters> |
    ReturnType<typeof addCharacter> |
    ReturnType<typeof removeCharacter> |
    ReturnType<typeof changeCharacterName> |
    ReturnType<typeof changeCharacterModifier> |
    ReturnType<typeof changeCharacterInitiative> |
    EmptyAction

enum ActionTypes {
    CHANGE_NAME = 'dnd-battle-tracker/game/CHANGE_NAME',
    SET_CHARACTERS = 'dnd-battle-tracker/game/SET_CHARACTERS',
    ADD_CHARACTER = 'dnd-battle-tracker/game/ADD_CHARACTER',
    REMOVE_CHARACTER = 'dnd-battle-tracker/game/REMOVE_CHARACTER',
    CHANGE_CHARACTER_NAME = 'dnd-battle-tracker/game/CHANGE_CHARACTER_NAME',
    CHANGE_CHARACTER_MODIFIER = 'dnd-battle-tracker/game/CHANGE_CHARACTER_MODIFIER',
    CHANGE_CHARACTER_ROLLED_INITIATIVE = 'dnd-battle-tracker/game/CHANGE_CHARACTER_ROLLED_INITIATIVE',
}

export interface Game {
    readonly name: string
    readonly characters: Array<Character>
}

export interface ShortCharacter {
    readonly name: string
    readonly initiativeModifier: number
}

export interface Character extends ShortCharacter {
    readonly id: number
    readonly initiative: number
}

export default combineReducers({
    name: nameReducer,
    characters: charactersReducer
})

function nameReducer(name: string = 'Default', action: GameAction): string {
    if (action.type !== ActionTypes.CHANGE_NAME) return name
    return action.payload
}

//TODO: Удалить дефолтный список персонажей
function charactersReducer(characters: Array<Character> = [
    {
        id: 1,
        name: 'Агуерич',
        initiativeModifier: 5,
        initiative: 13
    },
    {
        id: 2,
        name: 'Мельса',
        initiativeModifier: 3,
        initiative: 20
    }
], action: GameAction): Array<Character> {

    const getNextId = () => Math.max(...characters.map(ch => ch.id)) + 1

    const createCharacter = (data: ShortCharacter, id: number): Character => ({ id, ...data, initiative: 0 });

    switch (action.type) {
        case ActionTypes.SET_CHARACTERS:
            return action.payload.map(createCharacter)
        case ActionTypes.ADD_CHARACTER:
            return [...characters, createCharacter(action.payload, getNextId())]
        case ActionTypes.REMOVE_CHARACTER:
            return characters.filter(ch => ch.id !== action.payload)
        case ActionTypes.CHANGE_CHARACTER_NAME:
            return characters.map(ch => ch.id !== action.payload.id ? ch : {...ch, name: action.payload.name})
        case ActionTypes.CHANGE_CHARACTER_MODIFIER:
            return characters.map(ch => ch.id !== action.payload.id ? ch : {...ch, initiativeModifier: action.payload.modifier})
        case ActionTypes.CHANGE_CHARACTER_ROLLED_INITIATIVE:
            return characters.map(ch => ch.id !== action.payload.id ? ch : {...ch, initiative: action.payload.initiative})
        default:
            return characters
    }

}


export const changeName = (name: string):
    Action<typeof ActionTypes.CHANGE_NAME, string> => ({
    type: ActionTypes.CHANGE_NAME,
    payload: name
});

export const setCharacters = (characters: Array<ShortCharacter>):
    Action<typeof ActionTypes.SET_CHARACTERS, Array<ShortCharacter>> => ({
    type: ActionTypes.SET_CHARACTERS,
    payload: characters
});

export const addCharacter = (name: string, initiativeModifier: number):
    Action<typeof ActionTypes.ADD_CHARACTER, ShortCharacter> => ({
    type: ActionTypes.ADD_CHARACTER,
    payload: { name, initiativeModifier }
});

export const removeCharacter = (id: number):
    Action<typeof ActionTypes.REMOVE_CHARACTER, number> => ({
    type: ActionTypes.REMOVE_CHARACTER,
    payload: id
});

export const changeCharacterName = (id: number, name: string):
    Action<typeof ActionTypes.CHANGE_CHARACTER_NAME, { id: number, name: string }> => ({
    type: ActionTypes.CHANGE_CHARACTER_NAME,
    payload: { id, name }
})

export const changeCharacterModifier = (id: number, modifier: number):
    Action<typeof ActionTypes.CHANGE_CHARACTER_MODIFIER, { id: number, modifier: number }> => ({
    type: ActionTypes.CHANGE_CHARACTER_MODIFIER,
    payload: { id, modifier }
})

export const changeCharacterInitiative = (id: number, initiative: number):
    Action<typeof ActionTypes.CHANGE_CHARACTER_ROLLED_INITIATIVE, { id: number, initiative: number }> => ({
    type: ActionTypes.CHANGE_CHARACTER_ROLLED_INITIATIVE,
    payload: { id, initiative }
})
