import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes), // use this in production
  },  
  // {
  //   path: '',
  //   loadComponent: () => import('./tab1/editing/editing.page').then( m => m.EditingPage) //  only for testing, delete me
  // },
  {
    path: 'chat',
    loadComponent: () => import('./tab3/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'editing',
    loadComponent: () => import('./tab1/editing/editing.page').then( m => m.EditingPage)
  },

];
