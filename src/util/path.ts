const proxy = null;
const isDev = process.env.NODE_ENV === 'development';

const prod = {
  upload: '../../../SysManage/AjaxHandler/UploadHandler.ashx',
};

const dev = {
  upload: '../../../SysManage/AjaxHandler/UploadHandler.ashx',
};

const path = isDev ? dev : prod;

export { path, proxy, isDev };
