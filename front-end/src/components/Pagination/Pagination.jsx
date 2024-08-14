import React from 'react';
import './Pagination.css';
import prevIcon from '../../assets/prev.svg';
import nextIcon from '../../assets/next.svg';

const Pagination = ({ currentPage, totalMovies, moviesPerPage = 18, onPageChange }) => {
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`mx-1 px-3 py-1 rounded ${i === currentPage ? 'bg-primary text-white' : 'bg-gray-custom text-white'}`}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`mx-1 px-3 py-1 rounded ${1 === currentPage ? 'bg-primary text-white' : 'bg-gray-custom text-white'}`}
        >
          1
        </button>
      );

      if (currentPage > 2) {
        pageNumbers.push(<span key="dots-left" className="mx-1 text-white">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`mx-1 px-3 py-1 rounded ${i === currentPage ? 'bg-primary text-white' : 'bg-gray-custom text-white'}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        pageNumbers.push(<span key="dots-right" className="mx-1 text-white">...</span>);
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`mx-1 px-3 py-1 rounded ${totalPages === currentPage ? 'bg-primary text-white' : 'bg-gray-custom text-white'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto flex w-full h-[84px] px-[516px] py-[14px] flex-col justify-center items-center gap-2 flex-shrink-0">
      <div className="flex items-center">
        <button onClick={handlePrevClick} disabled={currentPage === 1} className="disabled:opacity-50">
          <img src={prevIcon} alt="Previous" />
        </button>

        <div className="flex mx-4">
          {renderPageNumbers()}
        </div>

        <button onClick={handleNextClick} disabled={currentPage === totalPages} className="disabled:opacity-50">
          <img src={nextIcon} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
