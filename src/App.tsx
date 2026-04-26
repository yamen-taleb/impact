import { ChevronLeft } from 'lucide-react'
import './App.css'
import { Button } from './components/ui/button'

import AtharLogo2 from './assets/Logo/AtharLogo2'

const App = () => {
  return (
      <div className='w-screen h-screen'>
        <div className='w-full h-full flex flex-col items-center justify-center gap-10'>
          <h1 className='text-[100px] font-bold'><AtharLogo2 className='w-full' /></h1>
          <p className='text-[20px]'>منصّة «أثر»… حيث تتحوّل أفكار طلاب جامعة حلب إلى مبادرات نابضة بالحياة، ويُكتب الأثر بالفعل التطوعي.</p>
          <Button
            className='w-[20%] h-[50px] bg-black text-white'
            onClick={() => {window.location.href = '/initiatives'}}
          >
            <h3 className='text-[20px]'>بادر الآن</h3><ChevronLeft />
          </Button>
        </div>
      </div>
  )
}

export default App
