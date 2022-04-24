import { TableBody, TableCell, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { isCasesDeathsGreaterThanZero } from "../../utils/dataTable";
import GlobalCell from "../GlobalCell/GlobalCell.jsx";
import Skeleton from "../Skeleton/Skeleton.jsx";

const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
    fontWeight: 500,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:first-child": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const style = {
  countryCell: {
    display: "flex",
    alignItems: "center",
  },
  flag: {
    width: "1.5rem",
    borderRadius: "2px",
    marginRight: "0.5em",
  },
  todayCasesStyle: {
    color: "#222",
    backgroundColor: "#ffeeaa",
    fontWeight: 600,
  },
  todayDeathsStyle: {
    backgroundColor: "#e53935",
    color: "#fff",
    fontWeight: 600,
  },
};

const DataTableBody = ({ countryDataRows, page, rowsPerPage, classes }) => {
  return (
    <TableBody>
      <GlobalCell />
      {countryDataRows.length !== 0 ? (
        countryDataRows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <StyledTableRow key={row.country}>
              <StyledTableCell align="center" className="tableCells">
                {row.countryRank}
              </StyledTableCell>
              <StyledTableCell align="left" className="tableCells">
                <div className={classes.countryCell}>
                  <img
                    src={row.countryFlag}
                    alt="flag"
                    className={classes.flag}
                  />
                  {row.country}
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" className="tableCells">
                {row.cases.toLocaleString("en-US")}
              </StyledTableCell>
              <StyledTableCell align="center" className="tableCells">
                {row.deaths.toLocaleString("en-US")}
              </StyledTableCell>
              <StyledTableCell align="center" className="tableCells">
                {row.critical.toLocaleString("en-US")}
              </StyledTableCell>
              <StyledTableCell align="center" className="tableCells">
                {row.recovered.toLocaleString("en-US")}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className={`tableCells ${
                  row.todayCases > 0 ? classes.todayCasesStyle : ""
                }`}
              >
                {isCasesDeathsGreaterThanZero(row.todayCases) ? "+" : ""}
                {row.todayCases.toLocaleString("en-US")}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className={`tableCells ${
                  row.todayDeaths > 0 ? classes.todayDeathsStyle : ""
                }`}
              >
                {isCasesDeathsGreaterThanZero(row.todayDeaths) ? "+" : ""}
                {row.todayDeaths.toLocaleString("en-US")}
              </StyledTableCell>
              <StyledTableCell align="center" className="tableCells">
                {row.casesPerOneMillion.toLocaleString("en-US")}
              </StyledTableCell>
              <StyledTableCell align="center" className="tableCells">
                {row.deathsPerOneMillion.toLocaleString("en-US")}
              </StyledTableCell>
            </StyledTableRow>
          ))
      ) : (
        <StyledTableRow>
          <StyledTableCell>
            <Skeleton />
          </StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  );
};

export default withStyles(style)(DataTableBody);
