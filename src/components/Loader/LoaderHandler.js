/**
 * @param {Object} object - loadInit 參數集合
 * @param {Number} object.index - 紀錄 lazyLoad 的次數, 必需要外部傳入, 因為 loadInit 會多次執行.
 * @param {Array} object.elements - 目前只做到獲取頁面中的 img tag, 來模擬讀取進度, 建議將 tag 集合轉為真陣列, 不建議使用 src arr 的方式, 因為可能會出現圖片路徑與 hash 改變名稱等問題.
 * @param {Function} object.callBack - elements load 事件執行的函式.
 * @param {Boolean} object.allLoadRunCallBack - 回調函式要在何時執行, true = 每個 load 事件都執行回調函式, false = 最後 load事件執行回調函式.
 */
function loadInit(object) {
  let el = new Image();

  // 將 object 掛到每個 el 身上, 讓 loadHandler 中的 this 使用.
  el.loadData = object;
  el.src = object.elements[object.index].src;

  el.addEventListener("load", loadHandler);
}

// load event function
function loadHandler() {
  // 刪除 el 的 load 事件.
  this.removeEventListener("load", loadHandler);

  // 補足索引和長度差距, 陣列 0 號執行 load 事件, 就計算 1 次.
  this.loadData.index++;

  // 記算當前 load 的百分比.
  let percentage = this.loadData.index / this.loadData.elements.length;

  // 如果 callBack 存在.
  if (this.loadData.callBack) {
    // 如果每個 load 事件都要執行 callBack.
    if (this.loadData.allLoadRunCallBack) {
      this.loadData.callBack(percentage);
    } else {
      // 在最後的 load 事件執行 callBack.
      if (this.loadData.index === this.loadData.elements.length) {
        this.loadData.callBack(percentage);
        return false;
      }
    }
  }

  // load 事件結束.
  if (this.loadData.index === this.loadData.elements.length) {
    return false;
  }

  // 繼續回調.
  loadInit(this.loadData);
}

export default {
  load({ index = 0, elements, callBack, allLoadRunCallBack = true }) {
    loadInit({ index, elements, callBack, allLoadRunCallBack });
  },
};
