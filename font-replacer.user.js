// ==UserScript==
// @name        Font replacer
// @namespace   font-replacer
// @grant       none
// @version     1.0
// @author      Coxxs
// @description Replace fonts hard coded by websites
// @include     *
// @license     MIT
// @run-at      document-start
// ==/UserScript==

function applyCSS(css) {
  if (!document.head) {
    const observer = new MutationObserver((mutations, observer) => {
      if (!document.head) return
      addCSS(css)
      observer.disconnect()
    })
    observer.observe(document.documentElement, { childList: true, subtree: true })
    return
  }
  addCSS(css)
}

function addCSS(css) {
  let style = document.createElement("style")
  style.innerHTML = css
  document.head.prepend(style)
}

class Replacer {
  constructor() {
    this.css = []
  }
  add(from, to) {
    for (const font of to) {
      let extra = []
      if (font.weight) {
        extra += `font-weight:${font.weight};`
      }
      this.css.push(`@font-face{font-family:"${from}";${extra}src:local("${font['name']}")}`)}
    }
  toString() {
    return this.css.join('')
  }
}

let replacer = new Replacer()

/**** Replace rules START *****/

const HarmonyOSSans = [
  { name: 'HarmonyOS Sans SC' },
]
const MiSans = [
  { name: 'MiSans Thin', weight: 100 },
  { name: 'MiSans ExtraLight', weight: 200 },
  { name: 'MiSans Light', weight: 300 },
  { name: 'MiSans Regular', weight: 400 },
  { name: 'MiSans Medium', weight: 500 },
  { name: 'MiSans Demibold', weight: 600 },
  { name: 'MiSans Bold', weight: 700 },
  { name: 'MiSans Heavy', weight: 900 },
]
const SourceHanSans = [
  { name: 'Source Han Sans SC' },
]

const to = SourceHanSans
replacer.add("宋体", to)
replacer.add("SimSun", to)
replacer.add("新宋体", to)
replacer.add("NSimSun", to)
replacer.add("华文中宋", to)
replacer.add("STZhongsong", to)
replacer.add("微软雅黑", to)
replacer.add("Microsoft YaHei", to)
replacer.add("Microsoft JhengHei", to)
replacer.add("黑体", to)
replacer.add("SimHei", to)
replacer.add("华文细黑", to)
replacer.add("STXihei", to)
replacer.add("STHeiTi", to)
replacer.add("幼圆", to)

/**** Replace rules END *****/

applyCSS(replacer.toString())
