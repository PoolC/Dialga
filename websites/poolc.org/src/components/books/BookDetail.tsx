import { match } from 'ts-pattern';
import { Skeleton, Result, Image, Button } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { BookControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { useAppSelector } from '~/hooks/useAppSelector';
import getFileUrl from '~/lib/utils/getFileUrl';
import { PageContent, PagePanel, PageShell } from '~/components/common/PageLayout/PageLayout';
import { PageHeader } from '~/components/common/PageHeader/PageHeader';
import colors from '~/lib/styles/colors';
import { media } from '~/styles/responsive';

const FALLBACK_BOOK_IMAGE = '/main-banner.png';

const useStyles = createStyles(({ css }) => ({
  content: css`
    width: 100%;
    max-width: 1210px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
  `,
  header: css`
    && {
      justify-content: center;
      text-align: center;
    }

    && > div:first-of-type {
      width: 100%;
      align-items: center;
      text-align: center;
    }

    && h2 {
      justify-content: center;
    }
  `,
  skeletonWrap: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  detailBody: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 44px;
    margin-top: 20px;
  `,
  hero: css`
    display: grid;
    width: 100%;
    max-width: 900px;
    grid-template-columns: 300px minmax(0, 1fr);
    align-items: center;
    gap: 56px;
    margin: 0 auto;

    ${media.compact} {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: 28px;
    }
  `,
  bookCover: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  coverImage: css`
    box-shadow: 2px 2px 21.7px rgba(115, 115, 115, 0.25);

    .ant-image-img {
      object-fit: cover;
    }
  `,
  bookInfo: css`
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    ${media.compact} {
      align-items: center;
      text-align: center;
    }
  `,
  bookMeta: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(76, 55, 34, 0.08);
  `,
  bookTitle: css`
    margin: 0;
    color: ${colors.brown[1]};
    font-weight: 800;
    font-size: 2rem;
    line-height: 1.25;
    overflow-wrap: anywhere;
  `,
  metaText: css`
    margin: 0;
    color: ${colors.brown[0]};
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.45;
  `,
  donorText: css`
    margin: 0;
    color: ${colors.mint[3]};
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.45;
  `,
  actionArea: css`
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  buttonsWrapper: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;

    ${media.compact} {
      justify-content: center;
    }
  `,
  buttonCommon: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    padding: 0 14px;
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: none;
  `,
  buttonDisabled: css`
    background-color: rgba(217, 217, 217, 1);
    &:disabled {
      background-color: rgba(217, 217, 217, 1);
      color: white;
    }
  `,
  buttonAbled: css`
    background-color: ${colors.mint[3]};
    &:hover,
    &:focus {
      background-color: ${colors.mint[3]} !important;
      opacity: 0.88;
    }
  `,
  borrowingInfo: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  borrowingText: css`
    margin: 0;
    color: ${colors.brown[0]};
    font-weight: 600;
    font-size: 0.9rem;
    line-height: 1.45;
  `,
  descriptionInfo: css`
    display: flex;
    width: min(100%, 860px);
    margin: 0 auto;
    flex-direction: column;
    gap: 14px;
    padding-top: 28px;
    border-top: 1px solid rgba(76, 55, 34, 0.08);
  `,
  sectionLabel: css`
    margin: 0;
    color: ${colors.brown[1]};
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
  `,
  descriptionText: css`
    margin: 0;
    color: ${colors.brown[1]};
    font-size: 0.96rem;
    font-weight: 300;
    line-height: 1.75;
    white-space: pre-wrap;
    word-break: keep-all;
  `,
  emptyDescription: css`
    color: ${colors.brown[0]};
  `,
  panel: css`
    && {
      padding: 60px 0;
    }
  `,
}));

export default function BookDetail({ bookId }: { bookId: number }) {
  const { styles } = useStyles();
  const queryClient = useQueryClient();
  const bookDetailQuery = useAppQuery({
    queryKey: queryKey.book.book(bookId),
    queryFn: () => BookControllerService.getBookUsingGet({ id: bookId }),
  });

  const loginId = useAppSelector((state) => state.auth.user.memberId);
  const isLoggedIn = Boolean(loginId);

  const { mutate: borrowBook, isPending: isPendingBorrowing } = useAppMutation({
    mutationFn: BookControllerService.borrowBookUsingPost,
  });
  const { mutate: returnBook, isPending: isPendingReturning } = useAppMutation({
    mutationFn: BookControllerService.returnBookUsingPost,
  });

  return (
    <PageShell>
      <PagePanel className={styles.panel}>
        <PageContent className={styles.content}>
          <PageHeader title="도서 정보" className={styles.header} />
          {match(bookDetailQuery)
            .with({ status: 'pending' }, () => (
              <div className={styles.skeletonWrap}>
                <Skeleton active />
                <Skeleton active />
              </div>
            ))
            .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
            .with({ status: 'success' }, ({ data }) => {
              const bookStatus = data.status;
              const { author, borrowDate, borrower, description, donor, imageURL, publishedDate, publisher, title } = data;
              const imageSrc = imageURL ? getFileUrl(imageURL) : FALLBACK_BOOK_IMAGE;

              return (
                <div className={styles.detailBody}>
                  <section className={styles.hero}>
                    <div className={styles.bookCover}>
                      <Image className={styles.coverImage} src={imageSrc} fallback={FALLBACK_BOOK_IMAGE} preview={false} alt={`${title} 이미지`} width="300px" height="394px" />
                    </div>
                    <div className={styles.bookInfo}>
                      <div className={styles.bookMeta}>
                        <h3 className={styles.bookTitle}>{title}</h3>
                        <p className={styles.metaText}>{[author, publisher, publishedDate?.slice(0, 4)].filter(Boolean).join(' | ')}</p>
                        <p className={styles.donorText}>{`기증자: ${donor || 'PoolC'}`}</p>
                      </div>
                      {isPendingBorrowing || isPendingReturning ? (
                        <Skeleton />
                      ) : (
                        <div className={styles.actionArea}>
                          {isLoggedIn && (
                            <div className={styles.buttonsWrapper}>
                              <Button
                                type="primary"
                                disabled={bookStatus !== 'AVAILABLE'}
                                className={`${styles.buttonCommon} ${bookStatus === 'AVAILABLE' ? styles.buttonAbled : styles.buttonDisabled} `}
                                onClick={() => {
                                  borrowBook(
                                    { id: bookId },
                                    {
                                      onSuccess: () => {
                                        queryClient.invalidateQueries({ queryKey: queryKey.book.book(bookId) });
                                      },
                                    },
                                  );
                                }}
                              >
                                대출하기
                              </Button>
                              <Button
                                type="primary"
                                disabled={bookStatus === 'AVAILABLE'}
                                className={`${styles.buttonCommon} ${bookStatus !== 'AVAILABLE' ? styles.buttonAbled : styles.buttonDisabled} `}
                                onClick={() => {
                                  returnBook(
                                    { id: bookId },
                                    {
                                      onSuccess: () => {
                                        queryClient.invalidateQueries({ queryKey: queryKey.book.book(bookId) });
                                      },
                                    },
                                  );
                                }}
                              >
                                반납하기
                              </Button>
                            </div>
                          )}
                          {bookStatus !== 'AVAILABLE' && (
                            <div className={styles.borrowingInfo}>
                              <p className={styles.borrowingText}>{`대출자: ${borrower?.name || '-'}`}</p>
                              <p className={styles.borrowingText}>{`대출일: ${borrowDate || '-'}`}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                  <section className={styles.descriptionInfo}>
                    <h4 className={styles.sectionLabel}>책 소개</h4>
                    <p className={`${styles.descriptionText} ${description ? '' : styles.emptyDescription}`}>{description || '등록된 책 소개가 없습니다.'}</p>
                  </section>
                </div>
              );
            })
            .exhaustive()}
        </PageContent>
      </PagePanel>
    </PageShell>
  );
}
