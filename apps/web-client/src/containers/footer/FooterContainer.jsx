import Footer from '../../components/footer/Footer';
import { PoolcControllerService, queryKey, useAppQuery } from '~/lib/api-v2';

const FooterContainer = () => {
  const { data: poolcInfo } = useAppQuery({
    queryKey: queryKey.poolc.poolc,
    queryFn: PoolcControllerService.findPoolcUsingGet,
  });

  return (
    <Footer
      presidentName={poolcInfo?.presidentName ?? ''}
      phoneNumber={poolcInfo?.phoneNumber ?? ''}
      location={poolcInfo?.location ?? ''}
    />
  );
};

export default FooterContainer;
