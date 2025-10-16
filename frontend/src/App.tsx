
import './App.css'
import { Button } from './components/Button'
import { AddIcon } from './icons/plus'
import { ShareIcon } from './icons/share'

function App() {

  return (
    <div className='flex gap-3' >
          <Button variant='secondary' text="Share" icon={<ShareIcon/>}/>
          <Button variant='primary' text="Add content" icon={<AddIcon/>}/>
    </div>
  )
}

export default App
