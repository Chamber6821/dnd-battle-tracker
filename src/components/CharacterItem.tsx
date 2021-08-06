import Grid              from '@material-ui/core/Grid';
import IconButton        from '@material-ui/core/IconButton';
import TextField         from '@material-ui/core/TextField';
import Typography        from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    useAppDispatch,
    useAppSelector
}                        from 'app/hooks';
import {
    changeCharacterInitiative,
    changeCharacterModifier,
    changeCharacterName,
    Character,
    removeCharacter
}                        from 'features/game';
import React             from 'react';

export interface Props {
    id: number,
    editing?: boolean
}

function CharacterItem({ id, editing = false }: Props) {
    const data = useAppSelector(state => state.game.characters.find(ch => ch.id === id)) as Character
    const dispatch = useAppDispatch()

    const handleClickDelete = () => dispatch(removeCharacter(id))
    const handleChangeName = (name: string) => dispatch(changeCharacterName(id, name))
    const handleChangeModifier = (modifier: number) => dispatch(changeCharacterModifier(id, modifier))
    const handleChangeInitiative = (initiative: number) => dispatch(changeCharacterInitiative(id, initiative))

    const normalMode = (
        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Grid item xs={3}>
                {
                    data.name ?
                        <Typography>{data.name}</Typography> :
                        <Typography color="textSecondary">Пусто</Typography>
                }
            </Grid>
            <Grid item xs={3}>
                <Typography color="textSecondary" variant="caption" display="inline">
                    Модификатор:&nbsp;
                </Typography>
                <Typography display="inline">{data.initiativeModifier}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography color="textSecondary" variant="caption" display="inline">
                    Выброшено:&nbsp;
                </Typography>
                <Typography display="inline">{data.initiative}</Typography>
            </Grid>
        </Grid>
    )

    const editMode = (
        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Grid item xs={3}>
                <TextField
                    label="Имя персонажа"
                    size="small"
                    variant="outlined"
                    value={data.name}
                    onChange={e => handleChangeName(e.target.value)}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    label="Модификатор"
                    type="number"
                    size="small"
                    variant="outlined"
                    value={data.initiativeModifier}
                    onChange={e => handleChangeModifier(+e.target.value)}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    label="Выброшено"
                    type="number"
                    size="small"
                    variant="outlined"
                    value={data.initiative}
                    onChange={e => handleChangeInitiative(+e.target.value)}
                />
            </Grid>
            <IconButton size="small" onClick={handleClickDelete}><DeleteForeverIcon color="secondary"/></IconButton>
        </Grid>
    )

    return editing ? editMode : normalMode
}

export default CharacterItem