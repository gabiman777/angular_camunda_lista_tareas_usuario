/*import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient(), provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        //link: httpLink.create({
          //uri: '<%= endpoint %>',
        //}),
        //link: httpLink.create({ uri: '/graphql' }),

        //link: httpLink.create({ uri: 'https://${REGION}.tasklist.camunda.io/${CLUSTER_ID}/graphql' }),
        //link: httpLink.create({ uri: 'https://jfk-1.tasklist.camunda.io/9391078c-1325-46fa-bda0-129b54fca5b6/graphql' }), //403 Forbidden
        
        //link: httpLink.create({ uri: 'https://${REGION}.tasklist.camunda.io/${CLUSTER_ID}/v1/tasks' }),
        //link: httpLink.create({ uri: 'https://jfk-1.tasklist.camunda.io/9391078c-1325-46fa-bda0-129b54fca5b6/v1/tasks' }),
        
        //JC: ${CAMUNDA_CLUSTER_REGION}.tasklist.camunda.io/${CAMUNDA_CLUSTER_ID}
        //link: httpLink.create({ uri: 'https://jfk-1.tasklist.camunda.io/9391078c-1325-46fa-bda0-129b54fca5b6/tasklist' }),
        link: httpLink.create({ uri: 'https://jfk-1.tasklist.camunda.io/9391078c-1325-46fa-bda0-129b54fca5b6/v1/tasks/search' }),
        cache: new InMemoryCache(),
      };
    })
  ]
};
*/

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(), // Provee HttpClient sin interceptores en función
    {
      provide: 'HTTP_INTERCEPTORS',
      useClass: AuthInterceptor,
      multi: true
    }, // Registra el interceptor de clase
  ],
};