export const GetParams = (name: string) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  let result: any =
    window.location.hash.split('?').length > 1
      ? window.location.hash.split('?')[1].match(reg)
      : 0;

  if (result != null) {
    return result[2] === 'undefined' ? undefined : result[2];
  }
  return null;
};
