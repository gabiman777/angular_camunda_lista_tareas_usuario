export const environment = {
  production: false,
  camunda: {
    region: 'jfk-1',
    clusterId: '4ab7e882-7690-46d9-b810-ac3fa29308de',
    clientId: 'bYFYL5Gg35VCRHyUJe_MQw_~gsgaHlfq',
    clientSecret: 'SKsGp_Z2JsgBeLa7MVi1mx0Lk0-77kE52Ua0vmFv-dTTxBZ3TKeWBV0EXH6MyK~Y',
    oauthUrl: 'https://login.cloud.camunda.io/oauth/token',
    tasklistBaseUrl: '/camunda-api', // Proxied path
    //tasklistBaseUrl: 'https://jfk-1.tasklist.camunda.io/4ab7e882-7690-46d9-b810-ac3fa29308de',
  },
};