import React from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';

function createData(username, tweet, location, retweet, protein) {
  return { username, tweet, location, retweet, protein };
}

const rows = [
  createData(
    'Bambang',
    ' Vaksin Berantas Pandemi https://t.co/zJ76VMoWx5',
    'Gorontalo',
    24,
    4.0
  ),
  createData('Budi susanto', '@Khairykj Hahaha... Tetap ', '-', 37, 4.3),
  createData(
    'zasrusoff',
    'Cikgu anti-vaksin > Ditukar ke sekolah',
    'Malaysia',
    24,
    6.0
  ),
];

const useStyles = makeStyles((theme) => ({
  paperTable: {
    height: 300,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowY: 'auto',
  },
  cellLimit: {
    display: 'block',
    width: '150px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  celldaerah: {
    padding: '1px',
    inlineSize: '20px',
    overflow: 'hidden',
  },
}));

export default function TableNegatif(props) {
  const classes = useStyles();
  // const history = useHistory();

  return (
    <>
      <TableBody>
        {/* {rows.map((row) => ( */}
        <TableRow
          key={props.key}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          hover
        >
          <TableCell component='th' scope='row'>
            <Link
              to={'/user/?' + props.username}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none' }}
            >
              <span
                style={{ fontWeight: 'bold', color: 'black' }}
                onClick={() => {
                  localStorage.setItem('issue', '');
                }}
              >
                {props.username}
              </span>
            </Link>
          </TableCell>
          <TableCell align='right' className={classes.cellLimit}>
            <Link
              to={'/user/?' + props.username}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => {
                localStorage.setItem('issue', '');
              }}
            >
              {props.tweet}
            </Link>
          </TableCell>
          <TableCell align='right' className={classes.celldaerah}>
            <Link
              to={'/user/?' + props.username}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => {
                localStorage.setItem('issue', '');
              }}
            >
              {props.location === '0' ? 'undefined' : props.location}
            </Link>
          </TableCell>
          <TableCell align='right'>
            <Link
              to={'/user/?' + props.username}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => {
                localStorage.setItem('issue', '');
              }}
            >
              {props.retweet}
            </Link>
          </TableCell>
        </TableRow>

        {/* ))} */}
      </TableBody>
    </>
  );
}
