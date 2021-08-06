import Box                                from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid                               from '@material-ui/core/Grid';
import IconButton                         from '@material-ui/core/IconButton';
import Paper                              from '@material-ui/core/Paper';
import TextField                          from '@material-ui/core/TextField';
import Typography                         from '@material-ui/core/Typography';
import CachedIcon                         from '@material-ui/icons/Cached';
import DoneIcon                           from '@material-ui/icons/Done';
import EditIcon                           from '@material-ui/icons/Edit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { changeName }                     from 'features/game';
import React                              from 'react';


interface Props {
    editing?: boolean
    onClickEdit?: () => void
    onClickDone?: () => void
    onClickRollDice?: () => void
}

function Header({ editing = false, onClickEdit, onClickDone, onClickRollDice }: Props) {
    const gameName = useAppSelector(state => state.game.name)
    const dispatch = useAppDispatch()

    const handleChangeName = (name: string) => dispatch(changeName(name))
    const handleClickRollDice = () => onClickRollDice && onClickRollDice()
    const handleClickEdit = () => onClickEdit && onClickEdit()
    const handleClickDone = () => onClickDone && onClickDone()

    const normalMode = (
        <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Grid item xs={3}>
                <Box marginLeft="16px">
                    <Typography>{gameName}</Typography>
                </Box>
            </Grid>
            <ButtonGroup size="medium">
                <IconButton onClick={handleClickRollDice}><CachedIcon/></IconButton>
                <IconButton onClick={handleClickEdit}><EditIcon/></IconButton>
            </ButtonGroup>
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
                <Box marginLeft="16px">
                    <TextField value={gameName} onChange={e => handleChangeName(e.target.value)}/>
                </Box>
            </Grid>
            <IconButton size="medium" onClick={handleClickDone}><DoneIcon/></IconButton>
        </Grid>
    )

    return (
        <Paper>
            {editing ? editMode : normalMode}
        </Paper>
    )
}

export default Header
