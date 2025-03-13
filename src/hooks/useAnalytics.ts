import posthog from "posthog-js";

export const useAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    posthog.capture(eventName, properties);
  };

  const trackPageView = (pageName: string) => {
    posthog.capture("$pageview", { page: pageName });
  };

  return {
    trackEvent,
    trackPageView,
  };
};
