import {
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { fetchCountryInfo } from "../../api";
import { ReactComponent as TableLogo } from "../../assets/globav2.svg";
import FilterField from "../FilterField/FilterField.jsx";
import DataTableBody from "../TableBody/TableBody.jsx";
import DataTableHead from "../TableHead/TableHead.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  wrapper: {
    padding: "1rem .75rem",
  },
  headerMain: {
    margin: "1.625em 0 .625em",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginRight: ".6em",
    height: "2.75em",
    width: "2.75em",
    [theme.breakpoints.down("xs")]: {
      height: "2.5em",
      width: "2.5em",
    },
  },
  title: {
    fontSize: "2rem",
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.55rem",
    },
  },
}));

const DataTable = () => {
  const classes = useStyles();

  const [countryDataRows, setCountryDataRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchedCountryInfo = async () => {
      const countryData = await fetchCountryInfo();
      const sortedCountryData = countryData
        .sort((a, b) => b.cases - a.cases)
        .map((country, index) => ({ ...country, countryRank: index + 1 }));
      setCountryDataRows(sortedCountryData);
    };

    fetchedCountryInfo();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFieldChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredCountryDataRows = countryDataRows.filter((row) =>
    row.country.toLowerCase().includes(filter)
  );

  return (
    <div className={classes.wrapper}>
      <div className={classes.headerMain}>
        <div>
          <TableLogo className={classes.logo} />
        </div>
        <Typography component="h1" className={classes.title}>
          Country Breakdown
        </Typography>
      </div>

      <FilterField handleChange={handleFieldChange} />

      <Paper variant="outlined" className={classes.root}>
        <TableContainer>
          <Table className="table" aria-label="customized table">
            <DataTableHead />
            <DataTableBody
              countryDataRows={filteredCountryDataRows}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={filteredCountryDataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default DataTable;
