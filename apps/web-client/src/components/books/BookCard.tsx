import { Link } from 'react-router-dom';
import { MENU } from '~/constants/menus';

export default function BookCard({ data: { id, title, imageURL, status } }: { data: { id: number; title: string; imageURL: string; status: string } }) {
  return (
    <Link to={`/${MENU.BOOKS}/${id}`}>
      <div>
        <img src={imageURL} alt={`${title}의 이미지`} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{`상태: ${status}`}</p>
      </div>
    </Link>
  );
}
