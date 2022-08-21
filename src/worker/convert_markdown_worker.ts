import * as marked from "marked"
import * as sanitizeHTML from 'sanitize-html'
const worker:Worker = self as any 

// メインスレッドからデータを渡されたときに実行する関数
worker.addEventListener('message', (event) => {
  //dataがメインスレッドから渡された引数
  // console.log('Work Received:', event.data)
  //postMessageで、メインスレッドへ処理結果を格納してかえす
  // worker.postMessage({result: event.data})
  const text = event.data
  const html = sanitizeHTML(marked(text), {allowedTags: [...sanitizeHTML.defaults.allowedTags, 'h1', 'h2']})
  worker.postMessage({html})
})

