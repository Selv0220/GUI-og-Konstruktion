import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('../login/login.page').then((m) => m.LoginPage),
  },

  {
    path: 'tabs/tab3/chat/:ContactId',
    loadComponent: () =>
      import('../tab3//chat/chat.page').then((m) => m.ChatPage),
  },
];
