import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Pagination extends Component {
  navigateTo = (e) => {
    const { history, url } = this.props;
    if (history && url) {
      history.push(`${url}?page=${e.target.dataset.value}`);
      window.location.reload();
    }
  };

  onNext = () => {
    const { currentPage, totalPages } = this.props;
    if (currentPage < totalPages) {
      return (
        <i
          className="fa fa-angle-right"
          data-value={currentPage + 1}
          key={currentPage + 1}
          onClick={this.navigateTo}
          alt="Next"
        />
      );
    }
    return (
      <i className="fa fa-angle-right" data-value={currentPage} key={currentPage} alt="Next" />
    );
  };

  onPrev = (e) => {
    const { currentPage, totalPages } = this.props;
    if (currentPage > 1 && currentPage <= totalPages) {
      return (
        <i
          className="fa fa-angle-left"
          data-value={currentPage - 1}
          key={currentPage - 1}
          onClick={this.navigateTo}
          alt="Previous"
        />
      );
    }
    return (
      <i className="fa fa-angle-left" data-value={currentPage} key={currentPage} alt="Previous" />
    );
  };

  PaginationIcon = () => {
    const { totalPages, currentPage } = this.props;
    const parent = [];
    let iconNumber = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (iconNumber === currentPage) {
        parent.push(
          <li data-value={iconNumber} key={iconNumber} className="selected current">
            {iconNumber}
          </li>,
        );
      } else {
        parent.push(
          <li data-value={iconNumber} key={iconNumber} className="page" onClick={this.navigateTo}>
            {iconNumber}
          </li>,
        );
      }
      iconNumber++;
    }
    if (totalPages < 5) {
      return parent;
    }
    if (currentPage === 1) {
      return parent.slice(currentPage - 1, currentPage + 4);
    }
    if (currentPage === 2) {
      return parent.slice(currentPage - 2, currentPage + 3);
    }
    if (currentPage === totalPages) {
      return parent.slice(currentPage - 5, currentPage);
    }
    if (currentPage === totalPages - 1) {
      return parent.slice(currentPage - 4, currentPage + 1);
    }
    return parent.slice(currentPage - 3, currentPage + 2);
  };

  render() {
    const { totalPages } = this.props;
    return (
      <div className="pagination">
        <span data-value={1} className="page" onClick={this.navigateTo}>
          First
        </span>
        <span>{this.onPrev()}</span>
        <ul className="pages">{this.PaginationIcon()}</ul>
        <span>{this.onNext()}</span>
        <span data-value={totalPages} className="page" onClick={this.navigateTo}>
          Last
        </span>
      </div>
    );
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  url: PropTypes.string,
  history: PropTypes.object,
};

Pagination.defaultProps = {
  totalPages: 1,
  currentPage: 1,
  url: '',
  history: {},
};

export default Pagination;
