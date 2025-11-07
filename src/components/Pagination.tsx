import { Dispatch, SetStateAction, useMemo } from "react";
import { I18N } from "../constants/i18n";
import { PaginationButton, PaginationRow } from "./components";

interface paginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  total?: number;
  pageSize?: number;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  total,
  pageSize,
}: paginationProps) => {
  const onClickPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const onClickNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const lastPage = useMemo(() => {
    if (!total || !pageSize) {
      return 0;
    }
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  return (
    <PaginationRow>
      <PaginationButton
        onClick={onClickPreviousPage}
        disabled={currentPage === 1}
      >
        {I18N.PREVIOUS_BUTTON}
      </PaginationButton>
      <p>Page {currentPage}</p>
      <PaginationButton
        disabled={currentPage === lastPage}
        onClick={onClickNextPage}
      >
        {I18N.NEXT_BUTTON}
      </PaginationButton>
    </PaginationRow>
  );
};
