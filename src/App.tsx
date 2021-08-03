import ButtonGroup       from '@material-ui/core/ButtonGroup';
import Container         from '@material-ui/core/Container';
import Grid              from '@material-ui/core/Grid';
import IconButton        from '@material-ui/core/IconButton';
import List              from '@material-ui/core/List';
import ListItem          from '@material-ui/core/ListItem';
import Paper             from '@material-ui/core/Paper';
import TextField         from '@material-ui/core/TextField';
import Typography        from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon          from '@material-ui/icons/Done';
import EditIcon          from '@material-ui/icons/Edit';
import React             from 'react';

function App() {
    return (
        <Container>
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item xs={6}>
                    <Paper>
                        <Typography>Приключение на 20 минут</Typography>
                    </Paper>
                    <List dense={true}>
                        <ListItem>
                            <Grid container direction="row" alignItems="stretch" justify="space-between">
                                <Grid item xs={3}>
                                    <Typography>Агуерич</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography color="textSecondary" variant="caption" display="inline">
                                        Модификатор:&nbsp;
                                    </Typography>
                                    <Typography display="inline">5</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography color="textSecondary" variant="caption" display="inline">
                                        Выброшено:&nbsp;
                                    </Typography>
                                    <Typography display="inline">21</Typography>
                                </Grid>
                                <IconButton size="small"><EditIcon/></IconButton>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container direction="row" alignItems="stretch" justify="space-between">
                                <Grid item xs={3}>
                                    <Typography>Мельса</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography color="textSecondary" variant="caption" display="inline">
                                        Модификатор:&nbsp;
                                    </Typography>
                                    <Typography display="inline">3</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography color="textSecondary" variant="caption" display="inline">
                                        Выброшено:&nbsp;
                                    </Typography>
                                    <Typography display="inline">4</Typography>
                                </Grid>
                                <IconButton size="small"><EditIcon/></IconButton>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container direction="row" alignItems="stretch" justify="space-between">
                                <Grid item xs={3}>
                                    <TextField
                                        label="Имя персонажа"
                                        size="small"
                                        variant="outlined"
                                        defaultValue="Агуерич"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Модификатор"
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        defaultValue="5"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        label="Выброшено"
                                        type="number"
                                        size="small"
                                        variant="outlined"
                                        defaultValue="21"
                                    />
                                </Grid>
                                <ButtonGroup size="small">
                                    <IconButton><DoneIcon/></IconButton>
                                    <IconButton><DeleteForeverIcon color="secondary"/></IconButton>
                                </ButtonGroup>
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
