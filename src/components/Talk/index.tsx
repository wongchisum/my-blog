import styles from './index.module.less'

interface TalkProps {
  content: string;
  imgSrc?: string;
}

export function Talk(props: TalkProps) {
  return (
    <div className={styles.talk}>
      <div>{props.content}</div>
      {/* {props.imgSrc && (
        <div>
          <img src={props.imgSrc} />
        </div>
      )} */}
    </div>
  );
}
