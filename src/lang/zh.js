export default {
  route: {
    dashboard: '資訊總頁',
    page401: '401',
    page404: '404',
    profile_view: '個人資訊',
    profile_edit: '編輯資訊',
    c_history: '歷史紀錄',
    c_information: '優惠資訊',
    c_card: '票卡管理',
    c_category: '分類管理',
    c_connection: '聯絡我們',
    c_accounting: '開始記帳',
    c_cardmanager: '卡片管理',
    c_accountmanager: '帳戶管理',
    c_categorymanager: '類別管理'
  },
  navbar: {
    logOut: '登出',
    dashboard: '首頁控制台',
    github: '項目地址',
    screenfull: '全屏',
    theme: '換膚',
    size: '布局大小',
    bdashboard: '回到總覽頁'
  },
  login: {
    title: '▶ 登錄 ◀',
    logIn: '登錄',
    username: '帳號',
    password: '密碼',
    any: '隨便填',
    thirdparty: '第三方登入',
    thirdpartyTips: '尚未完成'
  },
  signup: {
    title: '帳號註冊',
    signUP: '送出',
    username: '帳號(電子信箱)',
    password: '密碼',
    doublepswd: '請再次輸入密碼'
  },
  documentation: {
    documentation: '文檔',
    github: 'Github 地址'
  },
  permission: {
    roles: '你的權限',
    switchRoles: '切换權限'
  },
  guide: {
    description: '引導頁對於一些第一次進入項目的人很有用，你可以簡單介紹下項目的功能。本 Demo 是基於',
    button: '打開引導'
  },
  components: {
    documentation: '文檔',
    tinymceTips: '副文本是管理後台一个核心的功能，但同時又是一個有很多坑的地方。在選擇副文本的過程中我也走了不少的彎路，市面上常見的副文本都基本用過了，最終均衡了一下選擇了Tinymce。更詳細的副文本比较和介绍見',
    dropzoneTips: '由於我司業務有特殊需求，而且要傳七牛 所以没用第三方，選擇了自己封裝。代碼非常的簡單，具體代碼你可以在這裡看到 @/components/Dropzone',
    stickyTips: '當頁面滾動到預設的位置會吸附在頂部',
    backToTopTips1: '頁面滾動到指定位置會在右下角出现返回頂部按鈕',
    backToTopTips2: '可自定義按鈕的樣式、show/hide、出現的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由於我在使用時它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，優先還是使用官方版本。'
  },
  table: {
    dynamicTips1: '固定表頭, 按照表頭順序排序',
    dynamicTips2: '不固定表頭, 按照點順序排序',
    dragTips1: '默認順序',
    dragTips2: '拖曳後順序',
    title: '標題',
    importance: '重要性',
    type: '類型',
    remark: '備註',
    search: '搜索',
    add: '添加',
    export: '導出',
    reviewer: '審核人',
    id: '序號',
    date: '時間',
    author: '作者',
    readings: '閱讀數',
    status: '狀態',
    actions: '操作',
    edit: '編輯',
    publish: '發佈',
    draft: '草稿',
    delete: '刪除',
    cancel: '取 消',
    confirm: '確 定',
    project: '專案',
    account: '帳戶',
    class: '分類',
    subclass: '子分類',
    money: '金額'

  },
  errorLog: {
    tips: '請點擊右上角bug小圖示',
    description: '現在的管理後台基本都是spa的形式了，它增強了用戶體驗，但同時也會增加頁面出問題的可能性，可能一个小小的疏忽就導致整個頁面的死鎖。好在 Vue 官網提供了一個方法来捕獲處理異常，你可以在其中進行錯誤處理或者異常上報。',
    documentation: '文檔介紹'
  },
  excel: {
    export: '導出',
    selectedExport: '導出以選擇項',
    placeholder: '請輸入文件名(默認excel-list)'
  },
  zip: {
    export: '導出',
    placeholder: '請輸入文件名(默認file)'
  },
  theme: {
    change: '換膚',
    documentation: '換膚文檔',
    tips: 'Tips: 它區別於 navbar 上的 theme-pick, 是兩種不同的換膚方法，各自有不同的應用場景，具體請參考文檔。'
  },
  tagsView: {
    refresh: '刷新',
    close: '關閉',
    closeOthers: '關閉其它',
    closeAll: '關閉所有'
  },
  profile_edit: {
    email: '信箱',
    name: '姓名',
    password: '密碼',
    toid_ipt: '請輸入8位數字',
    password_ipt: '如不修改，空白即可',
    input: '再次輸入',
    confirm: '確 認',
    cancel: '取 消'
  },
  profile_view: {
    email: '信箱',
    name: '姓名',
    alter: '修改'
  },
  c_card_view: {
    content: '請輸入內容',
    search: '搜尋',
    add: '新增一筆',
    cardname: '卡片名稱',
    cardcode: '票卡條碼',
    operating: '操作',
    edit: '編輯',
    delete: '刪除',
    cancel: '取消',
    confirm: '確定'
  },
  c_category_view: {
    category: '分類',
    subclass: '子分類',
    content: '請輸入內容',
    search: '搜尋',
    add: '新增一筆',
    categorybudget: '分類預算',
    operating: '操作',
    edit: '編輯',
    delete: '刪除',
    cancel: '取消',
    confirm: '確定'
  },
  c_connection: {
    subject: '主旨',
    contents: '內容',
    sent: '送出',
    h1: '我們將在問題送出後3~5工作天內進行回覆'
  },
  c_accounting_view: {
    income: '收入',
    spend: '支出',
    accountname: '帳戶名稱',
    name: '請輸入名稱',
    papertime: '發票日期',
    class: '分類',
    choose: '請選擇',
    categories: '子分類',
    project: '專案',
    money: '金額',
    paper: '發票',
    amount: '請輸入',
    other: '備註',
    other2: '新增備註',
    data: '新增一筆',
    send: '送出'
  },
  c_accountmanager_view: {
    project: '帳戶類型',
    search: '搜尋',
    word: '請輸入內容',
    data: '新增一筆',
    style1: '帳戶類型',
    style2: '帳戶名稱',
    money: '初始金額',
    use: '操作',
    edit: '編輯',
    delete: '刪除',
    choose: '請選擇',
    canael: '取消',
    sure: '確定'
  },
  c_project: {
    word: '請輸入內容',
    search: '搜尋',
    data: '新增一筆',
    name: '專案名稱',
    expenditure: '專案總支出',
    income: '專案總收入',
    action: '操作',
    edit: '編輯',
    delete: '刪除',
    canael: '取消'
  },
  c_history: {
    startdate: '開始日期',
    enddate: '結束日期',
    to: '到'
  }
}
