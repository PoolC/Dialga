import getFileUrl from '~/lib/utils/getFileUrl';

export function getProfileImageUrl(url: string | undefined) {
  return url ? getFileUrl(url) : '/images/user-placeholder.jpeg';
}
