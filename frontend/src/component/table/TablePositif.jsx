import React from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paperTable: {
    height: 100,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowY: 'auto',
  },
  cellLimit: {
    display: 'block',
    float: 'left',
  },
  celldaerah: {
    padding: '1px',
    inlineSize: '20px',
  },
}));

export default function TablePositif(props) {
  const classes = useStyles();

  return (
    <>
      <TableBody>
        <TableRow
          key={props.key}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          style={{borderBottomStyle:'hidden'}}
          hover
        >
          <TableCell component='th' scope='row' style={{borderBottomStyle:'hidden',borderLeft:'groove' }}>
            <Link
              to={'/list-positif'}
              rel='noopener noreferrer'
              style={{ textDecoration: 'none' }}
            >
              <span
                style={{ fontWeight: 'bold', color: 'black'}}
                onClick={() => {
                  localStorage.setItem('issue', '');
                }}
              >
                {props.username}
              </span>
            </Link>
          </TableCell>
          <TableCell  className={classes.cellLimit} style={{borderBottomStyle:'hidden' ,borderLeft:'groove'}}>
            <Link
              to={'/list-positif'}
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => {
                localStorage.setItem('issue', '');
              }}
            >
              {props.tweet}
            </Link>
          </TableCell>
        </TableRow>

        {/* ))} */}
      </TableBody>
    </>
  );
}
