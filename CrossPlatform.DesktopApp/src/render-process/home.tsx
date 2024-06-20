import React from 'react';
import { createRoot } from 'react-dom/client';

import './common.less';
import './home-page/index.less';

const container = document.getElementById('root');

if (!!container) {
  const root = createRoot(container);

  const Render = () => {
    return <div className="content">Cross Platform App</div>;
  };

  root.render(<Render />);
} else {
  window.alert('Root element not found');
}
