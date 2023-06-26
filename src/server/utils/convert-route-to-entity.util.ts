const mapping: Record<string, string> = {
  articles: 'article',
  'sports-apps': 'sports_app',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
