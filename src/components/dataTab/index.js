import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ConvivaCollapsibleTable from './table';
import Box from '@material-ui/core/Box';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  preformatted: {
    textAlign: 'left'
  },
  'conviva-data-table': {
    '& > *': {
      borderBottom: 'unset',
    },
  }
}));

export default function DataTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Data Tab">
          <Tab label="Formatted Data" {...a11yProps(0)} />
          <Tab label="Raw Data" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {props.loading && 
          <Alert severity="warning">Loading....</Alert>
        }
        {!props.loading && props.data && props.data.sessions && !props.data.sessions.length && 
          <Alert severity="info">No Data available</Alert>
        }
        {!props.loading && props.data && props.data.sessions && props.data.sessions.length && 
          <ConvivaCollapsibleTable rows={props.data.sessions}></ConvivaCollapsibleTable>
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!props.loading && 
          <pre className={classes.preformatted}>
            {JSON.stringify(props.data.sessions, null, 2)}
          </pre>
        }
      </TabPanel>
    </div>
  );
}
