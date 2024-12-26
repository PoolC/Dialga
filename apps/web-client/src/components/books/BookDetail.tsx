import { match } from 'ts-pattern';
import { Skeleton, Result } from 'antd';
import { useParams } from 'react-router';
import { BookControllerService, queryKey, useAppQuery } from '~/lib/api-v2';

export default function BookDetail({ bookId }: { bookId: number }) {
  const bookDetailQuery = useAppQuery({
    queryKey: queryKey.book.book(bookId),
    queryFn: () => BookControllerService.getBookUsingGet({ id: bookId }),
  });
  const isLogin = false;
  return (
    <>
      {match(bookDetailQuery)
        .with({ status: 'pending' }, () => <Skeleton />)
        .with({ status: 'error' }, () => <Result status="500" subTitle="에러가 발생했습니다." />)
        .with({ status: 'success' }, ({ data } /* { posts: postList, maxPage } */) => {
          const bookStatus = data.status;
          const { author, borrowDate, borrower, description, donor, imageURL, publishedDate, publisher, title } = data;
          return (
            <div>
              <div>
                <div>
                  <img src={imageURL} alt={`${title} 이미지`} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <div>
                    <p>{`${author} | ${publisher} | ${publishedDate}`}</p>
                    <p>{`[${donor}]`}</p>
                  </div>
                  <div>
                    <p>상태: {bookStatus}</p>
                    {status === '대출가능' && isLogin && <button type="button">대출하기</button>}
                  </div>
                </div>
              </div>
              <div>
                <h4>책 소개</h4>
                <p>{description}</p>
              </div>
              <div>대충 페이지네이션?</div>
            </div>
          );
        })
        .exhaustive()}
    </>
  );
}
