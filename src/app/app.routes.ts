import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes), // use this in production
  },  
  // {
  //   path: '',
  //   loadComponent: () => import('./login/login.page').then( m => m.LoginPage) // for testing only
  // },
  {
    path: 'chat',
    loadComponent: () => import('./tab3/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'editing',
    loadComponent: () => import('./tab1/editing/editing.page').then( m => m.EditingPage)
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  // },
  {
    path: 'admin-page',
    loadComponent: () => import('./admin-page/admin-page.page').then( m => m.AdminPagePage)
  },

];
