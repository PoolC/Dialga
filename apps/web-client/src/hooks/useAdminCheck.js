import { useEffect } from 'react';
import * as authAPI from '../lib/api/auth';
import { useSelector } from 'react-redux';
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
          return;
        }
      })
      .catch((e) => {
        console.error(e.message);
        history.push(`/${MENU.FORBIDDEN}`);
      });
  }, [member, history]);
};
