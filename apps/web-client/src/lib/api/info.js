import client from './client';

export const getPoolCInfo = () => client.get('/poolc');

export const createPoolCInfo = ({
  presidentName,
  phoneNumber,
  location,
  locationUrl,
  introduction,
  mainImageUrl,
  isSubscriptionPeriod,
  applyUri,
}) =>
  client.post('/poolc', {
    presidentName,
    phoneNumber,
    location,
    locationUrl,
    introduction,
    mainImageUrl,
    isSubscriptionPeriod,
    applyUri,
  });

export const updatePoolCInfo = ({
  presidentName,
  phoneNumber,
  location,
  locationUrl,
  introduction,
  mainImageUrl,
  isSubscriptionPeriod,
  applyUri,
}) =>
  client.put('/poolc', {
    presidentName,
    phoneNumber,
    location,
    locationUrl,
    introduction,
    mainImageUrl,
    isSubscriptionPeriod,
    applyUri,
  });
