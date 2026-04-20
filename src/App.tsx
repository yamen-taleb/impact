import { ChevronLeft } from 'lucide-react'
import './App.css'
import { Button } from './components/ui/button'

const App = () => {
  return (
      <div className='w-screen h-screen'>
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <h1 className='text-[100px] font-bold'>أثــــــــــر</h1>
          <p className='text-[20px]'>منصّة «أثر»… حيث تتحوّل أفكار طلاب جامعة حلب إلى مبادرات نابضة بالحياة، ويُكتب الأثر بالفعل التطوعي.</p>
          <Button className='w-[20%] h-[50px] bg-black text-white'><h3 className='text-[20px]'>بادر الآن</h3><ChevronLeft /></Button>
        </div>
      </div>
  )
}

export default App
