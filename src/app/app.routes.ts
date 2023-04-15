import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'chat',
    loadComponent: () => import('./tab3/chat/chat.page').then( m => m.ChatPage)
  },

];
