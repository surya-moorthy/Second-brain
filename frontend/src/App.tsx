
import './App.css'
import { Button } from './components/Button'
import Card from './components/Card'
import { CreateContentModal } from './components/CreateContentModal'
import { AddIcon } from './icons/plus'
import { ShareIcon } from './icons/share'

function App() {

  return (
  <div>
       <CreateContentModal open={true}/>

        <div className='flex gap-3' >
          <Button variant='secondary' text="Share" icon={<ShareIcon/>}/>
          <Button variant='primary' text="Add content" icon={<AddIcon/>}/>
         </div>
       <div className='flex min-w-72 gap-5'>
            <Card type="twitter" title="Yesterday's Tweet" link={"https://x.com/sama/status/1978129344598827128"} />
            <Card link='https://www.youtube.com/watch?v=LOmjWb9JfOI' type='youtube' title='Nextjs learnings' />
       </div>
  </div>
  )
}

export default App
