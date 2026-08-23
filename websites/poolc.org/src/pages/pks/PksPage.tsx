import { Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import Skeleton from '~/components/common/Skeleton';
import PksContainer from '~/components/pks/PksContainer';
import { PagePanel, PageShell } from '~/components/common/PageLayout/PageLayout';
import useLoginCheck from '~/hooks/useLoginCheck';

export default function PksPage() {
  const history = useHistory();

  useLoginCheck(history);

  return (
    <PageShell>
      <PagePanel>
        <Suspense fallback={<Skeleton />}>
          <PksContainer />
        </Suspense>
      </PagePanel>
    </PageShell>
  );
}
