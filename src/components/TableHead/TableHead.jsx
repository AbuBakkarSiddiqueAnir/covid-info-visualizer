import { Paper, TableCell, TableHead, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { memo } from "react";
import columns from "../../utils/tableColumns";

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#fff",
    color: "#212529",
    fontSize: 14,
    textAlign: "center",
    fontWeight: 600,
  },
}))(TableCell);

const DataTableHead = () => (
  <Paper component={TableHead}>
    <TableRow>
      {columns.map((column) => (
        <StyledTableCell className="tableCells" key={column.id}>
          {column.label}
        </StyledTableCell>
      ))}
    </TableRow>
  </Paper>
);

export default memo(DataTableHead);
