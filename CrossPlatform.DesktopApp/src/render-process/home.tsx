import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AfterEditEvent, BeforeSaveDataDetails, ColumnDataSchemaModel, ColumnRegular, ColumnTemplateProp, RevoGrid, RevoGridCustomEvent, Template } from '@revolist/react-datagrid';

import './common.less';
import './home-page/index.less';

interface IDataItem {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
  h: string;
}

const container = document.getElementById('root');

const HeaderCell = (props: ColumnTemplateProp | ColumnDataSchemaModel) => {
  const { name: headerTitle } = props as ColumnTemplateProp;

  return (
    <span>
      <strong style={{ color: 'green' }}>{headerTitle}</strong>
    </span>
  );
};

const Cell = (props: ColumnTemplateProp | ColumnDataSchemaModel) => {
  const { prop, value } = props as ColumnDataSchemaModel;

  return <div>{value}</div>;
};

const columns: ColumnRegular[] = [
  {
    prop: 'a',
    name: 'A',
    columnTemplate: Template(HeaderCell),
  },
  {
    prop: 'b',
    name: 'B',
  },
  {
    prop: 'c',
    name: 'C',
  },
  {
    prop: 'd',
    name: 'D',
  },
  {
    prop: 'e',
    name: 'E',
  },
  {
    prop: 'f',
    name: 'F',
  },
  {
    prop: 'g',
    name: 'G',
  },
  {
    prop: 'h',
    name: 'H',
  },
];
const source: IDataItem[] = new Array(1000000).fill('').map((_, idx) => ({
  a: `A_${idx}_${(Math.random() * 10000).toFixed(2)}`,
  b: `B_${idx}_${(Math.random() * 10000).toFixed(2)}`,
  c: `C_${idx}_${(Math.random() * 10000).toFixed(2)}`,
  d: `D_${idx}_${(Math.random() * 10000).toFixed(2)}`,
  e: `E_${idx}_${(Math.random() * 10000).toFixed(2)}`,
  f: `F_${idx}_${(Math.random() * 10000).toFixed(2)}`,
  g: `G_${idx}_${(Math.random() * 10000).toFixed(2)}`,
  h: `H_${idx}_${(Math.random() * 10000).toFixed(2)}`,
}));

if (!!container) {
  const root = createRoot(container);

  const Render = () => {
    const [dataSource, setDataSource] = useState(source);

    const aftereditHandler = (evt: RevoGridCustomEvent<AfterEditEvent>) => {
      const { rowIndex, prop, val: targetValue, value: rawValue, model } = evt.detail as BeforeSaveDataDetails;

      console.info('prop', prop);
      console.info('rawValue', rawValue);
      console.info('targetValue', targetValue);
      console.info('model', model);

      const newData: IDataItem[] = [...dataSource];
      const newModel: IDataItem = { ...(model as IDataItem) };

      for (const attrKey in newModel) {
        const typedKey = attrKey as keyof IDataItem;
        const typedVal = targetValue as any;

        newModel[typedKey] = typedVal;
      }

      newData[rowIndex] = newModel;

      setDataSource(newData);
    };

    return (
      <div className='content'>
        <RevoGrid columns={columns} source={dataSource} onAfteredit={aftereditHandler} />
      </div>
    );
  };

  root.render(<Render />);
} else {
  window.alert('Root element not found');
}
