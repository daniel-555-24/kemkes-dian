import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';



export default function TableHeader() {
  return (
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight : 'bold'}}>User</TableCell>
            <TableCell style={{ fontWeight : 'bold'}}>Tweet</TableCell>
          </TableRow>
        </TableHead>
  );
}