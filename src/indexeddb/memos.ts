import Dexie from 'dexie'
import { memo } from 'react'

export interface MemoRecord {
  datatime: string
  title: string
  text: string
}

//Dexieのインスタンスを生成（markdown-editorというデータベース名）
const database = new Dexie('markdown-editor')
//テーブルを定義。version(1)はDBのversion。storesでテーブルとインデックスとなるデータ名を指定。
database.version(1).stores({memos: '&datatime'})
//データを扱うテーブルクラスを取得する。
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

//editorページでの変更を保存
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datatime = new Date().toISOString()
  await memos.put({datatime, title, text})
}

//ページネーション
const NUM_PER_PAGE: number = 10
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  return pageCount > 0 ? pageCount : 1
}

//historyページで変更を取得
export const getMemos = (page: number):Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datatime').reverse().offset(offset).limit(NUM_PER_PAGE).toArray()
}