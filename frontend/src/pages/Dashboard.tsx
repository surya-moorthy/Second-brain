import { Button } from '../components/Button'
import Card from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import Sidebar from '../components/Sidebar'
import { useModal } from '../context/ModalContext'
import { useContent } from '../hooks/useContent'
import { AddIcon } from '../icons/plus'
import { ShareIcon } from '../icons/share'

function Dashboard() {
   const {openModal} = useModal();
   const contents = useContent();
  return (
  <div className='w-screen '>
    <div className='border-r-2 border-gray-500 '>
      <Sidebar/>
    </div>
    <div className='p-10 ml-72 min-h-screen bg-gray-100'>
      <CreateContentModal/>

        <div className='flex gap-3 justify-end' >
          <Button variant='secondary' text="Share" icon={<ShareIcon/>}/>
          <div onClick={openModal}>
          <Button variant='primary' text="Add content" icon={<AddIcon/>} />
          </div>
         </div>
       <div className='flex min-w-72 gap-5'>
        {contents.map(({type,link,title})=> {
              return (
                  <Card type={type} title={title} link={link} />
              )
        })}
       </div>
    </div>
  </div>
  )
}

export default Dashboard