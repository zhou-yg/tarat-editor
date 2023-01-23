import editorDriver from '@/drivers/editor'
import React from 'react'
import Folder from 'tarat-cascading-list/dist/views/folder'
import Item from 'tarat-cascading-list/dist/views/item'
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
    <div className="w-full h-full p-2 flex" style={{ height: '100vh' }}>
      <div className='w-[400px]' style={{ width: '300px', borderRight: '1px solid #f4f4f4' }}>
        <Folder title="我的文件夹" {...editorDriverResult.cascading} />
      </div>
      <div style={{ width: '300px' }}>
        <Item {...editorDriverResult.cascading} />
      </div>
      {mid >= 0 ? (
        <div className='flex-1 h-full' style={{ borderLeft: '1px solid #f4f4f4' }}>
          <Editor {...editorDriverResult.mdEditor} editorProgress={progressState} height={600} />
        </div>
      ) : ''}
    </div>
  )
}