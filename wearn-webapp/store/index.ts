import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, useGlobalState, getGlobalState }=createGlobalState({
  connectedAccount: '',
  currentChain:'',
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  contract:null,
  started:false,
  DAIBalance:'0',
  myDAIBalance:0,
  yDAIBalance:'0',
})

const setAlert = (msg:string, color = 'green') => {
  setGlobalState('loading', { show: false, msg: ''})
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color })
  }, 3000)
}

const setLoadingMsg = (msg:string) => {
  const loading = getGlobalState('loading')
  setGlobalState('loading', {show: true, msg })
}

const truncate = (text:string, startChar:number, endChars:number, maxLength:number) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChar)
    var end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  setLoadingMsg,
  setAlert
//   truncate,
}
