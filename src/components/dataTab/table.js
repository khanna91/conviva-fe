import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.asset}
        </TableCell>
        <TableCell align="right">{row.country}</TableCell>
        <TableCell align="right">{row.avgBitrateKbps}</TableCell>
        <TableCell align="right">{row.joinTimeMs}</TableCell>
        <TableCell align="right">{row.startTimeMs}</TableCell>
        <TableCell align="right">{row.playTimeMs}</TableCell>
        <TableCell align="right">{row.buffTimeMs}</TableCell>
        <TableCell align="right">{row.restartTimeMs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <pre>
                {JSON.stringify(row.tags, null, 2)}
              </pre>
              <span>Stream URL: {row.streamUrl}</span>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ConvivaCollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Asset</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Avg Bitrate</TableCell>
            <TableCell align="right">Join Time</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">Play Time</TableCell>
            <TableCell align="right">Buffer Time</TableCell>
            <TableCell align="right">Restart Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
