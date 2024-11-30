import styles from "./index.module.less";

export interface PaginationProps {
  pageNum: number;
  maxPageNum: number;
  hasNextPage?: boolean;
  onPageChange: (pageNum: number) => void;
}

export function Pagination({
  pageNum,
  maxPageNum,
  hasNextPage = true,
  onPageChange,
}: PaginationProps) {
  const hasPrevPage = pageNum !== 1;
  const handlePageChange = (increase: boolean) => {
    onPageChange(increase ? pageNum + 1 : pageNum - 1);
  };
  return (
    <div className={styles.pagination}>
      <span>
        Page:{pageNum} / {maxPageNum}
      </span>
      {hasPrevPage && (
        <span className={styles.btn} onClick={() => handlePageChange(false)}>{`<- Prev Page `}</span>
      )}
      {hasNextPage && (
        <span className={styles.btn} onClick={() => handlePageChange(true)}>{`Next Page ->`}</span>
      )}
    </div>
  );
}
