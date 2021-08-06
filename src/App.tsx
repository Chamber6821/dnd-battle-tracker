import Container                          from '@material-ui/core/Container';
import Grid                               from '@material-ui/core/Grid';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import CharacterList                      from 'components/CharacterList';
import Header                             from 'components/Header';
import { changeCharacterInitiative }      from 'features/game';
import { useState }                       from 'react';

function App() {
    const [editing, setEditing] = useState(false)
    const characters = useAppSelector(state => state.game.characters)
    const dispatch = useAppDispatch()

    const rollDice = () => {
        characters.forEach(ch => {
            const initiative = Math.floor(Math.random() * 20) + ch.initiativeModifier + 1
            dispatch(changeCharacterInitiative(ch.id, initiative))
        })
    }

    return (
        <Container>
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                    <Header
                        editing={editing}
                        onClickEdit={() => setEditing(true)}
                        onClickDone={() => setEditing(false)}
                        onClickRollDice={rollDice}
                    />
                    <CharacterList editing={editing}/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
