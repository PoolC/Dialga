import { match } from 'ts-pattern';
import { Skeleton, Result, Image, Button } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { BookControllerService, queryKey, useAppMutation, useAppQuery } from '~/lib/api-v2';
import { Block, WhiteBlock } from '~/styles/common/Block.styles';
// import { BookListSearch } from './BookList';
import { useAppSelector } from '~/hooks/useAppSelector';
import getFileUrl from '~/lib/utils/getFileUrl';

const useStyles = createStyles(({ css }) => ({
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 82px;
  `,
  content: css`
    max-width: 627px;
    display: flex;
    flex-direction: column;
    gap: 84px;
  `,
  bookInfo: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 51px;
    /* height: 300px; */
    /* display: flex;
    gap: 51px; */
  `,
  bookCover: css`
    display: flex;
    justify-content: end;
    align-items: center;
    box-sizing: border-box;
    /* width: 100px; */
    width: auto;
  `,
  bookhandler: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* gap: 23px; */
    width: 310px;
  `,
  bookMeta: css`
    display: flex;
    flex-direction: column;
    /* width: 310px; */
    gap: 12px;
  `,
  bookTitle: css`
    font-weight: 700;
    font-size: 28px;
    overflow-wrap: break-word;
  `,

  buttonCommon: css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 63px;
    height: 30px;
    color: white;
    border-radius: 11px;
    text-decoration: none;
  `,
  buttonDisabled: css`
    background-color: rgba(217, 217, 217, 1);
    &:disabled {
      background-color: rgba(217, 217, 217, 1);
      color: white;
    }
  `,
  buttonAbled: css`
    background-color: rgba(72, 189, 155, 1);
  `,

  buttonsWrapper: css`
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: center;
    justify-content: start;
  `,
  borrowingPart: css`
    display: flex;
    flex-direction: column;
    gap: 23px;
  `,
  borrowingText: css`
    font-weight: 700;
    font-size: 15px;
    color: rgba(130, 121, 113, 1);
  `,
  descripticInfo: css`
    width: 627px;
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 10px;
    padding: 30px 34px;
  `,
  descripticLabel: css``,
}));

export default function BookDetail({ bookId }: { bookId: number }) {
  const { styles } = useStyles();
  const queryClient = useQueryClient();
  const bookDetailQuery = useAppQuery({
    queryKey: queryKey.book.book(bookId),
    queryFn: () => BookControllerService.getBookUsingGet({ id: bookId }),
  });

  const loginId = useAppSelector((state) => state.auth.user.memberId);

  const { mutate: borrowBook, isPending: isPendingBorrowing } = useAppMutation({
    mutationFn: BookControllerService.borrowBookUsingPost,
  });
  const { mutate: returnBook, isPending: isPendingReturning } = useAppMutation({
    mutationFn: BookControllerService.returnBookUsingPost,
  });

  return (
    <Block>
      <WhiteBlock className={styles.wrapper}>
        <h2>도서 정보</h2>

        {match(bookDetailQuery)
          .with({ status: 'pending' }, () => <Skeleton />)
          .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
          .with({ status: 'success' }, ({ data } /* { posts: postList, maxPage } */) => {
            const bookStatus = data.status;
            const { author, borrowDate, borrower, description, donor, imageURL, publishedDate, publisher, title } = data;
            return (
              <div className={styles.content}>
                <div className={styles.bookInfo}>
                  <div className={styles.bookCover}>
                    {/* <img src={imageURL} alt={`${title} 이미지`} style={{ height: '300px' }} /> */}
                    <Image src={getFileUrl(imageURL)} alt={`${title} 이미지`} height="300px" />
                  </div>
                  <div className={styles.bookhandler}>
                    <div className={styles.bookMeta}>
                      <h3 className={styles.bookTitle}>{title}</h3>

                      <p style={{ fontSize: '15px', fontWeight: '700', color: 'rgba(130, 121, 113, 1)' }}>{`${author} | ${publisher} | ${publishedDate?.slice(0, 4)}`}</p>
                      <p style={{ fontSize: '15px', fontWeight: '700', color: 'rgba(72, 189, 155, 1)' }}>{`기증자: ${donor}`}</p>
                    </div>
                    {isPendingBorrowing || isPendingReturning ? (
                      <Skeleton />
                    ) : (
                      <div className={styles.borrowingPart}>
                        <div style={{ width: '310px', height: '1px', background: 'rgba(238, 238, 238, 1)' }} />
                        {loginId ? (
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
                            {/* <Button type="primary" className={`${styles.buttonCommon} ${styles.buttonDisabled}`}>
                            예약하기
                          </Button> */}
                          </div>
                        ) : (
                          false
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <p className={styles.borrowingText}>{`대출자: ${borrower?.name || ''}`}</p>
                          <p className={styles.borrowingText}>{`대출일: ${borrowDate || ''}`}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.descripticInfo}>
                  {/* <div>
                    <h4>책 리뷰:</h4>
                    <p>{description}</p>
                  </div> */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '21px', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        height: '25px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '9px',
                        background: 'rgba(245, 245, 245, 1)',
                        color: 'rgba(130, 121, 113, 1)',
                        fontWeight: '700',
                        padding: '3px 5px',
                      }}
                    >
                      책 소개:
                    </span>
                    <p style={{ width: '503px', fontWeight: '600', lineHeight: '1.3', whiteSpace: 'pre-wrap' }}>{`${description}`}</p>
                  </div>
                  {/* <div>
                    <h4>작가 소개:</h4>
                    <p>{description}</p>
                  </div> */}
                </div>
                {/* <div>대충 페이지네이션?</div> */}
              </div>
            );
          })
          .exhaustive()}
        {/* <BookListSearch setSearch={(data) => console.log('dadta: ', data)} /> */}
      </WhiteBlock>
    </Block>
  );
}
