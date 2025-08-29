export const environment = {
  production: false,
  camunda: {
    region: 'jfk-1',
    clusterId: '9391078c-1325-46fa-bda0-129b54fca5b6',
    clientId: '1kBZ97ZbY9v~LD6HWt3g8_~9RekeO__f', // Reemplaza con tu client_id
    clientSecret: 'pLXkApFKGebI10Wd0VnxJfo0aJulzQCiWI_6nxx9MnqeenRQkKB9PKniSC6gy-5v', // Reemplaza con tu client_secret
    oauthUrl: 'https://login.cloud.camunda.io/oauth/token',
    //tasklistBaseUrl: 'https://jfk-1.tasklist.camunda.io/9391078c-1325-46fa-bda0-129b54fca5b6',
    tasklistBaseUrl: '/camunda-api', // Proxied path
  },
};