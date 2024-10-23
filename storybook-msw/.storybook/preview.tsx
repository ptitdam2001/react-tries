import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize, mswLoader } from "msw-storybook-addon";
import React from "react";

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize({
  onUnhandledRequest: ({ url, method }) => {
    const pathname = new URL(url).pathname;

    if (pathname.startsWith("/api/v1")) {
      console.error(`Unhandled ${method} request to ${url}.

        This exception has been only logged in the console, however, it's strongly recommended to resolve this error as you don't want unmocked data in Storybook stories.

        If you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses
      `);
    }
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   refetchInterval: 100,
    //   refetchOnMount: true,
    // },
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default preview;
