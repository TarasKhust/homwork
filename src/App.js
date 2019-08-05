import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductItem from "./components/ProductItem";
import Pagination from "./components/Pagination";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: ""
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.products.length
    });
  }

  showProducts = products => {
    let result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return <ProductItem key={index} product={product} />;
      });
    }
    return result;
  };

  onChangePage = data => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };

  render() {
    let { keyword, products } = this.props;
    const {
      totalPages,
      currentPage,
      pageLimit,
      startIndex,
      endIndex
    } = this.state;

    if (keyword) {
      products = products.filter(product => {
        return product.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    let rowsPerPage = products.slice(startIndex, endIndex + 1);

    return (
        <div className="section product_list_mng">
          <div className="container-fluid">
            <div className="box_product_control mb-15">
              <div className="row">
                <div className="col-xs-12 box_change_pagelimit">
                   По
                  <select
                      className="form-control"
                      value={pageLimit}
                      onChange={e =>
                          this.setState({ pageLimit: parseInt(e.target.value) })
                      }
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  елементов на Странице
                </div>
              </div>
            </div>
            <div className="box_tbl_list">
              <table className="table table-bordered table-hover">
                <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Surname</th>
                  <th className="text-center">Description</th>
                </tr>
                </thead>
                <tbody>{this.showProducts(rowsPerPage)}</tbody>
              </table>
            </div>
            <div className="box_pagination">
              <div className="row">
                <div className="col-xs-12 box_pagination_info text-right">
                  <p>
                    {products.length} Всего Елементов | Текущая Страница {currentPage}/{totalPages}
                  </p>
                </div>
                <div className="col-xs-12 text-center">
                  <Pagination
                      totalRecords={products.length}
                      pageLimit={pageLimit || 5}
                      initialPage={1}
                      pagesToShow={5}
                      onChangePage={this.onChangePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

App.propTypes = {
  products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
  ).isRequired,
  keyword: PropTypes.string,

};

const mapStateToProps = state => {
  return {
    products: state.products,
    keyword: state.search
  };
};


export default connect(
    mapStateToProps,
)(App);
