import { useSelector } from 'react-redux';
import rootReducer from '~/modules';

export const useAppSelector = useSelector<ReturnType<typeof rootReducer>>;
