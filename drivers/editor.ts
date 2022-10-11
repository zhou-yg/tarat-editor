import {
  after,
  compose,
  createPrisma,
  injectWrite,
  inputComputeInServer,
  computed,
  state,
  injectModel
} from 'tarat/core'

import mdEditor from './compose/mdEditor'

import cascading from './compose/cascading'

export default function editor (q: { id: number }) {
  const s = state(0)
  const mdEditorCompose = compose(mdEditor, [q])
  const cascadingCompose = compose(cascading)

  const currentItem = computed(() => {
    const newId = cascadingCompose.currentItemId()
    const items = cascadingCompose.items()
    return items.find((item) => item.id === newId)    
  })

  after(() => {
    const cur = currentItem()
    console.log('[after] cur: ', cur, (cur as any)?.markdown?.id);
    if ((cur as any)?.markdown?.id) {
      try {
        mdEditorCompose.currentId(() => (cur as any)?.markdown?.id)
      } catch (error) {
        console.log('[after] error: ', error);
      }
    }
  }, [currentItem])

  injectModel(cascadingCompose.items, () => ({
    include: { markdown: true }
  }))

  injectWrite(cascadingCompose.writeItems, 'create', () => ({
    name: 'new markdown',
    markdown: {
      create: {
        title: 'new markdown'
      }
    }
  }))

  return {
    // composed
    // cascading: cascadingCompose,
    cascading: {
      ...cascadingCompose,
    },
    mdEditor: mdEditorCompose,
    // 
    s
  }
}