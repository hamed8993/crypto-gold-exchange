import { Dispatch, SetStateAction, useState } from 'react';

export type PaginationType = {
  maxRowsPerPage: string;
  page: string;
  setMaxRowsPerPage: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
};

export const usePagination = (): PaginationType => {
  const [page, setPage] = useState<number>(1);

  const [maxRowsPerPage, setMaxRowsPerPage] = useState<number>(10);

  return {
    maxRowsPerPage: String(maxRowsPerPage),
    page: String(page),
    setMaxRowsPerPage,
    setPage,
  };
};
