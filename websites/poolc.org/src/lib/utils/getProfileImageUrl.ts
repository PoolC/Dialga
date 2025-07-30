import getFileUrl from '~/lib/utils/getFileUrl';
import userPlaceholder from '~/assets/images/user-placeholder.jpeg';

export function getProfileImageUrl(url: string | undefined) {
  return url ? getFileUrl(url) : userPlaceholder;
}
