import React from 'react'
import { useLocation } from 'react-router-dom'

import Cascading from 'tarat-cascading-list/dist/views/cascading'
import Editor from 'tarat-markdown-editor/dist/views/editor'

export default function Main () {

  return (
    <div className="w-full p-2 flex">
      <div className='w-[400px]' style={{ width: '400px' }}>
        <Cascading />
      </div>
      <div className='flex-1'>
        <Editor />
      </div>
    </div>
  )
}