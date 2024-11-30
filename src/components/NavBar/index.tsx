import styles from "./index.module.less";

interface NavItem {
  name: string;
  id: string;
  active?:boolean
}

type NavEventType = "series" | "home" | "talks";

export interface NavBarProps {
  logoSrc?: string;
  title?: string;
  items: NavItem[];
  onNavClick: (type: NavEventType, ...args: any[]) => void;
}

export function NavBar(props: NavBarProps) {
  const { logoSrc, title, items = [], onNavClick } = props;

  // 左侧点击
  const handleHome = () => {
    onNavClick("home")
  };

  // 右侧点击
  const handleSeriesClick = (id: string) => {
    onNavClick("series", id);
  };

  // 点击内容
  const handleTalk = () => {
    onNavClick("talks");
  }
  return (
    <div className={styles.navBar}>
      <div className={styles.navItems}>
        <div className={styles.left} >
          {logoSrc && <img src={logoSrc} />}
          <div className={styles.title} onClick={handleHome}>{title}</div>
          <div className={styles.talks} onClick={handleTalk}>Talks</div>
        </div>
        <div className={styles.right}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`${styles.name} ${item.active ? styles.active : ""}`}
              onClick={() => handleSeriesClick(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
