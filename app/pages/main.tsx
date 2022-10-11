import editorDriver from '@/drivers/editor'
import React from 'react'
import cascading from 'tarat-cascading-list/dist/drivers/cascading'

import Cascading from 'tarat-cascading-list/dist/views/cascading'
import Editor from 'tarat-markdown-editor/dist/views/editor'
import 'tarat-markdown-editor/dist/views/editor.css'
import { useProgress, useTarat } from 'tarat/connect'

export default function Main () {

  const editorDriverResult = useTarat(editorDriver, { id: -1})

  const progressState = useProgress(editorDriverResult)
  console.log('progressState: ', progressState, editorDriverResult.cascading.currentItemId());

  const mid = editorDriverResult.mdEditor.currentId()

  console.log('mid: ', mid);

  return (
    <div className="w-full p-2 flex">
      <div className='w-[400px]' style={{ width: '400px' }}>
        <Cascading {...editorDriverResult.cascading} />
      </div>
      {mid >= 0 ? (
        <div className='flex-1'>
          <Editor {...editorDriverResult.mdEditor} editorProgress={progressState} height={600} />
        </div>
      ) : ''}
    </div>
  )
}