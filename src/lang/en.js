export default {
  route: {
    dashboard: 'Dashboard',
    page401: '401',
    page404: '404',
    profile_view: 'User Profile',
    profile_edit: 'Edit Profile',
    c_history: 'History Record',
    c_information: 'Information',
    c_card: 'Card',
    c_category: 'Category',
    c_connection: 'Connection',
    c_accounting: 'Start accounting',
    c_cardmanager: 'Card Manage'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size',
    bdashboard: 'Back to Dashboard'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username(Email)',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Not Finish~'
  },
  signup: {
    title: 'Sign UP',
    signUP: 'Send Out',
    username: 'Account(Email)',
    password: 'Password',
    doublepswd: 'Plz enter the same Password'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  guide: {
    description:
      'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips:
      'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips:
      'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips:
      'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1:
      'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2:
      'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips:
      'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    project: 'Project',
    account: 'Account',
    class: 'Class',
    subclass: 'Subclass',
    money: 'Money'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description:
      'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips:
      'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  profile_edit: {
    email: 'Email',
    name: 'Name',
    password: 'Password',
    toid_ipt: 'Please enter 8 numbers',
    password_ipt: 'If not modified, blank',
    input: 'Input Again',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  profile_view: {
    email: 'Email',
    name: 'Name',
    alter: 'Aiter'
  },
  c_card_view: {
    content: 'Please enter the content',
    search: 'Search',
    add: 'Add',
    cardname: 'CardName',
    cardcode: 'CardCode',
    operating: 'Operating',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  c_category_view: {
    category: 'Category',
    subclass: 'Subclass',
    content: 'Please enter the content',
    search: 'Search',
    add: 'Add',
    categorybudget: 'CategoryBudget',
    operating: 'Operating',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  c_connection: {
    subject: 'Subject',
    contents: 'contents',
    sent: 'Sent',
    h1: 'We will respond within 3~5 working days after the problem is sent.'
  },
  c_accounting_view: {
    income: 'Income',
    spend: 'Spend',
    accountname: 'Accountname',
    name: 'Please enter your account name',
    papertime: 'Receipt Date',
    class: 'Classification',
    choose: 'Please select',
    categories: 'Sub-categories',
    project: 'Project',
    money: 'Money',
    paper: 'Receipt',
    amount: 'Please enter',
    other: 'Registration',
    other2: 'New registration',
    data: 'Add a new amount of data',
    send: 'Send out'
  },
  c_accountmanager_view: {
    project: 'Account Type',
    search: 'Search',
    word: 'Please enter the content',
    data: 'Add a new amount of data',
    style1: 'Account type',
    style2: 'Account name',
    money: 'Initial amount',
    use: 'Operation',
    edit: 'Edit',
    delete: 'Delete',
    choose: 'Please select',
    canael: 'Canael',
    sure: 'Sure'
  },
  c_project: {
    word: 'Please enter the content',
    search: 'Seach',
    data: 'Add',
    name: 'Project Name',
    expenditure: 'Total Project Expenditure',
    income: 'Total Project Income',
    action: 'Action',
    edit: 'Edit',
    delete: 'Delete',
    canael: 'Canael'
  },
  c_history: {
    startdate: 'Start Date',
    enddate: 'End Date',
    to: 'to'
  }
}
