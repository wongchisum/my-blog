import {talks} from '@/constants/talks'
import {Talk} from '@/components'
import styles from './index.module.less'
export function Talks() {
    return (
        <div className={styles.talks}>
            {
                talks.map((item,index) => <Talk {...item} key={index}/>)
            }
        </div>
    )
}