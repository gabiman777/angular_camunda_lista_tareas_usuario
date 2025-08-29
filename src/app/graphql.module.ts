import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://jfk-1-9391078c-1325-46fa-bda0-129b54fca5b6.tasklist.camunda.io/9391078c-1325-46fa-bda0-129b54fca5b6/graphql'; // Endpoint al cluster de Camunda Cloud

export function provideApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext(async (operation, context) => {
    // Aquí obtén el token OAuth. Usa un servicio de auth para fetcharlo.
    // Ejemplo: POST a https://login.cloud.camunda.io/oauth/token con client_id y client_secret.
    const token = await getAccessToken(); // Implementa esta función con fetch o HttpClient
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return { link, cache };
}

async function getAccessToken(): Promise<string> {
  // Implementa fetch para obtener token OAuth
  const response = await fetch('https://login.cloud.camunda.io/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      audience: 'tasklist.camunda.io', // Audience para Tasklist API
      client_id: '1kBZ97ZbY9v~LD6HWt3g8_~9RekeO__f', // Reemplaza con tu Client ID
      client_secret: 'pLXkApFKGebI10Wd0VnxJfo0aJulzQCiWI_6nxx9MnqeenRQkKB9PKniSC6gy-5v' // Reemplaza con tu Client Secret
    })
  });
  const data = await response.json();
  return data.access_token;
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}