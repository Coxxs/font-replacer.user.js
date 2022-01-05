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
 
function addStyle(css) {
  const _insertStyle = (css) => {
    let style = document.createElement("style")
    style.innerHTML = css
    document.head.prepend(style)
  }
  if (document.head) {
    _insertStyle(css)
  } else {
    const observer = new MutationObserver((mutations, observer) => {
      if (!document.head) return
      _insertStyle(css)
      observer.disconnect()
    })
    observer.observe(document.documentElement, { childList: true, subtree: true })
  }
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

const SourceHanSansSC = [
  { name: 'Source Han Sans SC' },
]

const SourceHanSansTC = [
  { name: 'Source Han Sans TC' },
]

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

// Simpified Chinese
const FontSC = SourceHanSansSC
replacer.add("宋体", FontSC)
replacer.add("SimSun", FontSC)
replacer.add("新宋体", FontSC)
replacer.add("NSimSun", FontSC)
replacer.add("微软雅黑", FontSC)
replacer.add("Microsoft YaHei", FontSC)
replacer.add("黑体", FontSC)
replacer.add("SimHei", FontSC)
// replacer.add("华文中宋", FontSC)
// replacer.add("STZhongsong", FontSC)
// replacer.add("华文细黑", FontSC)
// replacer.add("STXihei", FontSC)
// replacer.add("STHeiTi", FontSC)
// replacer.add("幼圆", FontSC)

// Traditional Chinese
const FontTC = SourceHanSansTC
replacer.add("微軟正黑體", FontTC)
replacer.add("Microsoft JhengHei", FontTC)
replacer.add("新細明體", FontTC)
replacer.add("PMingLiU", FontTC)
replacer.add("細明體", FontTC)
replacer.add("MingLiU", FontTC)


/**** Replace rules END *****/
 
addStyle(replacer.toString())
