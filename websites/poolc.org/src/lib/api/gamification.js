import client from './client';

export const getGameSummary = () => client.get('/gamification/me/summary');
export const getCollection = () => client.get('/gamification/me/collection');
export const getDrawHistory = () => client.get('/gamification/me/draws');
export const getFeaturedCollectible = () => client.get('/gamification/me/featured');
export const updateFeaturedCollectible = ({ collectibleId, shiny }) => client.put('/gamification/me/featured', { collectibleId, shiny });
export const clearFeaturedCollectible = () => client.delete('/gamification/me/featured');
export const drawCollectible = ({ shiny = false } = {}) => client.post('/gamification/me/draws', { shiny });
export const getAchievements = () => client.get('/gamification/me/achievements');
export const claimAchievement = (achievementKey) => client.post(`/gamification/me/achievements/${achievementKey}/claim`);
export const startCatalogSync = () => client.post('/gamification/admin/catalog/sync');
export const getLatestCatalogSync = () => client.get('/gamification/admin/catalog/sync/latest');
