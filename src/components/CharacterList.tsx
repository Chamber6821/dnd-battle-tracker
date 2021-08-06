import Box                                from '@material-ui/core/Box';
import IconButton                         from '@material-ui/core/IconButton';
import List                               from '@material-ui/core/List';
import ListItem                           from '@material-ui/core/ListItem';
import AddIcon                            from '@material-ui/icons/Add';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import CharacterItem                      from 'components/CharacterItem';
import { addCharacter }                   from 'features/game';

interface Props {
    editing?: boolean
}

function CharacterList({ editing = false }: Props) {
    const characters = useAppSelector(state => state.game.characters)
    const dispatch = useAppDispatch()

    const handleClickAdd = () => dispatch(addCharacter('', 0))

    return <List dense={true}>
        {
            characters.map(ch =>
                <ListItem key={ch.id + ''}>
                    <CharacterItem id={ch.id} editing={editing}/>
                </ListItem>
            )
        }
        {editing &&
        <ListItem>
            <Box m="auto">
                <IconButton size="medium" onClick={handleClickAdd}><AddIcon/></IconButton>
            </Box>
        </ListItem>
        }
    </List>
}

export default CharacterList