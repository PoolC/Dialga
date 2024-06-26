import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as authAPI from '../lib/api/auth';
import { MENU } from '../constants/menus';
import { SUCCESS } from '../constants/statusCode';

export default (history) => {
  const member = useSelector((state) => state.auth);
  useEffect(() => {
    authAPI
      .loadUser()
      .then((res) => {
        if (res.status === SUCCESS.OK && res.data.isAdmin === false) {
          history.push(`/${MENU.FORBIDDEN}`);
        }
      })
      .catch(() => {
        history.push(`/${MENU.FORBIDDEN}`);
      });
  }, [member, history]);
};
