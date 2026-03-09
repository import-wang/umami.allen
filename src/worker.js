import { Container, getContainer } from '@cloudflare/containers';

export class UmamiContainer extends Container {
  defaultPort = 3000;
  sleepAfter = '10m';
}

export default {
  async fetch(request, bindings) {
    const url = new URL(request.url);
    const instance = getContainer(bindings.UMAMI_CONTAINER, url.hostname);
    await instance.startAndWaitForPorts({
      startOptions: {
        envVars: {
          DATABASE_URL: bindings.DATABASE_URL,
          DATABASE_TYPE: bindings.DATABASE_TYPE,
          APP_SECRET: bindings.APP_SECRET,
        },
      },
    });
    return instance.fetch(request);
  },
};
