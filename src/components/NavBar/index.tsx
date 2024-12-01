import styles from "./index.module.less";
import { useNavigate } from "react-router";

interface NavItem {
  name: string;
  id: string;
  active?: boolean;
}

type NavEventType = "series" | "home" | "talks" | "search";

export interface NavBarProps {
  logoSrc?: string;
  title?: string;
  items: NavItem[];
}

export function NavBar(props: NavBarProps) {
  const { logoSrc, title, items = [] } = props;
  const nav = useNavigate();

  const handleClick = (type: NavEventType, id?: string) => {
    switch (type) {
      case "home":
        nav("/");
        break;
      case "talks":
        nav("/talks");
        break;
      case "search":
        nav("/search");
        break;
      case "series":
        nav(`/posts/${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navItems}>
        <div className={styles.left}>
          {logoSrc && <img src={logoSrc} />}
          <div className={styles.title} onClick={() => handleClick("home")}>
            {title}
          </div>
          <div className={styles.search} onClick={() => handleClick("search")}>
            Search
          </div>
          <div className={styles.talks} onClick={() => handleClick("talks")}>
            Talks
          </div>
        </div>
        <div className={styles.right}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`${styles.name} ${item.active ? styles.active : ""}`}
              onClick={() => handleClick("series", item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
