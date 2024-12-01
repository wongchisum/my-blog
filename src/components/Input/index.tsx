import styles from "./index.module.less";
import { useImperativeHandle, useRef } from "react";

interface InputProps {
  disabled?: boolean;
  onSearch: (text: string) => void;
}

export function Input(props: InputProps) {
  const inputRef = useRef<HTMLInputElement>();

  const handleSearch = () => {
    if (props.disabled) return;
    if (!inputRef.current) return;
    const value = (inputRef.current.value || "").trim();
    if (!value.length) return;
    props.onSearch(value);
  };
  return (
    <div className={styles.input}>
      <input ref={inputRef} placeholder="Please input..." />
      <div className={styles.search} onClick={handleSearch}>
        Search
      </div>
    </div>
  );
}
