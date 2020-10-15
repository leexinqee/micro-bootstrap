import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { BASE_NAME } from './config'
import routes from './routes'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import { Provider } from 'mobx-react';
import models from './models'

import '../public/common.scss'

const Root = () => (
  <AppContainer>
    <Provider {...models}>
      <HashRouter basename={BASE_NAME}>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  </AppContainer>
)

export async function bootstrap() {
  console.log('react app bootstraped');
  renderWithHotReload(routes)
}

export async function mount(props) {
  console.log("子应用 mount", props);
  const { container } = props || {};
  ReactDOM.render( <Root />,
    container ? container.querySelector('#micro_app_root') : document.getElementById('micro_app_root'),
  );
}

export async function unmount() {
  console.log("子应用 unmount")
  const { container } = props || {};
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#micro_app_root') : document.getElementById('micro_app_root'),
  );
}

// 不是在微应用的环境下的情况
if (!window.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount);
}

function renderWithHotReload(routes) {
  ReactDOM.render(<Root />,
    document.getElementById('micro_app_root')
  )
}
