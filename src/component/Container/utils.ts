export const formatConfig = (config: Array<any>) => {
  let result: any = [];
  for (let item of config) {
    const {
      fname,
      controltype,
      fvalue,
      isvisiable,
      isadd,
      defaultvalue,
      editpageorderid,
      isnull,
      issearchfield,
      maxlen,
      minlen,
      foreigndata,
    } = item;
    result.push({
      type: (controlTypeEnums as any)[controltype],
      key: fname,
      name: fvalue,
      showInEdit: isadd,
      showInDetail: isvisiable,
      defaultValue: defaultvalue,
      orderInEdit: editpageorderid,
      orderInDetail: editpageorderid,
      isNull: isnull,
      isSearchItem: issearchfield,
      maxLength: maxlen,
      minLength: minlen,
      foreignData: foreigndata,
    });
  }
  return result;
};

const controlTypeEnums = {
  1: 'input',
  2: 'datePicker',
  3: 'select',
  5: 'checkbox',
  9: 'calendar',
  12: 'upload',
  14: 'mapPicker',
  99: 'label',
};
