import { Button } from '../components/Button'
import Card from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import Sidebar from '../components/Sidebar'
import { useModal } from '../context/ModalContext'
import { useContent } from '../hooks/useContent'
import { AddIcon } from '../icons/plus'
import { ShareIcon } from '../icons/share'

function Dashboard() {
  const { openModal } = useModal();
  const { contents, loading, deleteContent, refetch } = useContent();

  if (loading) {
    return <div className="p-10 ml-72">Loading...</div>;
  }

  return (
    <div className='w-screen'>
      <div className='border-r-2 border-gray-500'>
        <Sidebar />
      </div>
      <div className='p-10 ml-72 min-h-screen bg-gray-100'>
        <CreateContentModal />

        <div className='flex gap-3 justify-end mb-5'>
          <Button variant='secondary' text="Share" icon={<ShareIcon />} />
          <div onClick={openModal}>
            <Button variant='primary' text="Add content" icon={<AddIcon />} />
          </div>
        </div>

        <div className='flex flex-wrap gap-5'>
          {contents.map(({ type, link, title, _id }) => (
            <Card
              key={_id}
              type={type}
              title={title}
              link={link}
              _id={_id} // pass deletion function to Card
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
