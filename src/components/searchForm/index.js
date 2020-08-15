import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

export default function SearchForm(props) {
  const classes = useStyles();

  const [account, setAccount] = useState('');

  const handleInputChange = e => {
    const {value} = e.target
    setAccount(value)
  }
  
  return (
    <form className={classes.root} noValidate autoComplete="off" >
      <div>
        <TextField id="standard-search" label="Account Number" type="search" onChange={handleInputChange} value={account}/>
        <Button variant="contained" color="primary" onClick={(ev) => props.searchPlayerEvent(account)}>
          Retrieve
        </Button>
      </div>
    </form>
  );
}