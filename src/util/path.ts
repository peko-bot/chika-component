const proxy = null;
const isDev = process.env.NODE_ENV === 'development';

const prod = {
  upload: '../../../SysManage/AjaxHandler/UploadHandler.ashx', // 主程序的上传接口
};

const dev = {
  upload: '../../../SysManage/AjaxHandler/UploadHandler.ashx', // 主程序的上传接口
};

const path = isDev ? dev : prod;

export { path, proxy, isDev };
