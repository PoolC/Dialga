import { Suspense } from 'react';
import { PagePanel, PageShell } from '~/components/common/PageLayout/PageLayout';
import Spinner from '~/components/common/Spinner/Spinner';
import MemberListContent from './MemberListContent';

const MemberList = () => (
  <PageShell>
    <PagePanel>
      <Suspense fallback={<Spinner />}>
        <MemberListContent />
      </Suspense>
    </PagePanel>
  </PageShell>
);

export default MemberList;
