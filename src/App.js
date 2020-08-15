import React, { useState } from 'react';
import Header from './components/header';
import SearchForm from './components/searchForm';
import DataTab from './components/dataTab';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});

  const searchPlayerEvent = async (value) => {
    setLoading(true);
    const url = `http://localhost:3000/v1/account/${value}`;
    const response = await fetch(url)
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        return response
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setIsError(true);
      })
    setData(response.response);
  }

  return (
    <div className="App">
      <Header />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <SearchForm searchPlayerEvent={searchPlayerEvent} loading={loading}/>
            </Paper>  
          </Grid>
          <Grid item xs={12}>
            <DataTab data={data} loading={loading} error={isError}/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
