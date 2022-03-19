import type { NextPage } from 'next'
import { createUseStyles } from 'react-jss'

const Home: NextPage = () => {
  const styles = useStyles()
  return <div className={styles.foo}></div>
}

const useStyles = createUseStyles({
  foo: {
    backgroundColor: 'blue',
    height: 50,
  },
})

export default Home
