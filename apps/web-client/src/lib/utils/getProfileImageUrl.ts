export function getProfileImageUrl(url: string | undefined) {
  if (!url) {
    return '/images/user-placeholder.jpeg';
  }
  return `/images/profile-${+url}.png`;
}
