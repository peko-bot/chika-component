// import { formatDate } from '../../util';

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
      unit,
      dateformat,
      decimalcount,
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
      unit,
      dateFormat: dateformat,
      decimalCount: decimalcount,
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

export const formatControls = (
  dataItem: any,
  config: Array<any>,
  primaryKey: string,
) => {
  let result = [];
  const keys = Object.keys(dataItem);
  for (let item of keys) {
    const targetItem = config.filter(target => target.key === item);
    if (targetItem.length) {
      const { key, showInDetail, type } = targetItem[0];
      if (!showInDetail) continue;
      const value = dataItem[key];
      const tempItem = {
        id: ~~(Math.random() * 10000),
        ...targetItem[0],
        value: dataItem[key],
        templateOrder: dataItem.templateOrder,
        // when mapPicker change, dataSource will change target item by this.
        primaryValue: dataItem[primaryKey],
      };

      switch (type) {
        case 'mapPicker':
          const latng = value.split('|');
          result.push({
            ...tempItem,
            lng: latng[0],
            lat: latng[1],
            address: latng[2],
          });
          break;

        case 'upload':
          const originFileList = JSON.parse(value || '[]');
          let fileList = [];
          for (let file of originFileList) {
            fileList.push({
              url: file.filepath,
              id: file.id || ~~(Math.random() * 1000),
              name: file.filetile,
            });
          }
          tempItem.value = fileList;
          result.push(tempItem);
          break;

        case 'datePicker':
          tempItem.value = tempItem.value
            ? new Date(tempItem.value)
            : new Date();
          result.push(tempItem);
          break;

        default:
          result.push(tempItem);
          break;
      }
    }
  }
  return result;
};

// export const defaultDataFormatEnum = [
//   {
//     key: 'data-date-format',
//     method: (value: string, format: string) => formatDate(value, format),
//   },
//   {
//     key: 'data-decimal-count',
//     method: (value: number, decimalCount: number) =>
//       +parseFloat(value.toFixed(decimalCount)).toPrecision(12),
//   },
//   {
//     key: 'data-unit',
//     method: (value: number | string, unit: string) => `${value} ${unit}`,
//   },
// ];
