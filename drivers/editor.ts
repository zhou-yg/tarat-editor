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

  // try {
  //   after(() => {
  //     if (!currentItem()) {
  //       cascadingCompose.currentItemId(() => {
  //         return cascadingCompose.items()[0]?.id
  //       })
  //     }
  //   }, [cascadingCompose.items])
  // } catch(e) {
  //   console.error(e)
  // }

  after(() => {
    const cur = currentItem()
    const cid = (cur as any)?.markdown?.id
    console.log('[after] cur: ', cur, cid);
    if (cid) {
      try {
        mdEditorCompose.currentId(() => cid)
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