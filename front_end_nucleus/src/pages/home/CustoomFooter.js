import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const defaultFooterStyles = {};

class CustomFooter extends React.Component {
  handleRowChange = (event) => {
    this.props.changeRowsPerPage(event.target.value);
  };

  handlePageChange = (_, page) => {
    this.props.changePage(page);
  };

  handlePaginationChange = (_, page) => {
    page = page - 1;
    console.log(page);
    this.props.changePage(page);
  };

  render() {
    const {
      count,
      classes,
      textLabels,
      rowsPerPage,
      page,
      numberPages,
      rowsPerPageOptions,
    } = this.props;

    const footerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 24px 5px 24px',
    };

    return (
      <TableFooter>
        <TableRow>
          <TableCell style={footerStyle} colSpan={1000}>
            <FormControl className={classes.formControl}>
              <FormHelperText>Linhas por página</FormHelperText>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={rowsPerPage}
                onChange={this.handleRowChange}
                displayEmpty
                className={classes.selectEmpty}
              >
                {rowsPerPageOptions.map((value) => (
                  <MenuItem value={value}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Pagination
              count={numberPages}
              page={page + 1}
              showFirstButton
              showLastButton
              style={footerStyle}
              onChange={this.handlePaginationChange}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(defaultFooterStyles, { name: 'CustomFooter' })(
  CustomFooter,
);
