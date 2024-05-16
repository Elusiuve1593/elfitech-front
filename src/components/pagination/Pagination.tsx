import { nextPageReducer, previousPageReducer, setPageReducer } from "../../redux/events/slice";
import { useAppDispatch } from "../../redux/redux_hooks";
import { AppDispatch } from "../../redux/store";
import styles from "./Pagination.module.scss";

interface PaginationInterface {
  page: number;
  totalPages: number;
}

export const Pagination = ({ page, totalPages }: PaginationInterface) => {
  const dispatch: AppDispatch = useAppDispatch();

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles["pagination-container"]}>
      <button
        className={styles["pagination-button"]}
        disabled={page <= 1}
        onClick={() => dispatch(previousPageReducer())}
      >
        Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`${styles["pagination-button"]} ${page === pageNumber ? styles.active : ""}`}
          disabled={page === pageNumber}
          onClick={() => dispatch(setPageReducer(pageNumber))}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={styles["pagination-button"]}
        disabled={page >= totalPages}
        onClick={() => dispatch(nextPageReducer())}
      >
        Next
      </button>
    </div>
  );
};
