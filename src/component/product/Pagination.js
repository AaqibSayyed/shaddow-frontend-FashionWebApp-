import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { updatePageRequested } from "../../redux/slices/productSlice/getProducts/getProductsSlice";
import { useState, useEffect } from "react";

const ReactPaginateContainer = styled.div`
  ul{
    display: flex;
    list-style-type: none;
    justify-content: center;
    margin-top: 27px;
    margin-bottom: 70px;
  }

  li a {
    padding: 15px;
    border: black .2px solid;
    border-radius: 5px;
    &:hover{
      cursor: pointer;
      }
  }

  li.selected a{
    background-color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};

  }

  li.disabled a {
    color: grey;
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    li a {
    padding: 12px;
  }
  }
`;

function Pagination({ productCategory  }) {
  const { filteredSearchCount, productPrice, productSubCategory } =
    useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const productPerPage = 6;
  const TotalPages = Math.ceil(filteredSearchCount/productPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    dispatch(updatePageRequested(event.selected + 1));
  };

  useEffect(() => {
    setCurrentPage(0);
    dispatch(updatePageRequested(1))
  }, [dispatch, productCategory, productPrice, productSubCategory]);

  return (
    <ReactPaginateContainer>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        forcePage={currentPage}
        pageCount={TotalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </ReactPaginateContainer>
  );
}

export default Pagination;
