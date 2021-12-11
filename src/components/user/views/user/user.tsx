import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import { useFilteredUsers } from '../../../../store';
import { startLoadingUsers } from '../../../../store/reducers';
import { NavTabMenus } from '../../../common/nav-tab-menu';
import { CreateUserInlineFormView } from '../../create-user-inline-form';
import { useDispatch } from 'react-redux';
import { ScrollToTop } from '../../../common/scroll-to-top';
import { UserList } from '../../user-list';

import styles from './user.module.css';

interface OwnProps {
  isActive: boolean;
  showCreateUserForm?: boolean;
}

type UserProps = OwnProps & RouteComponentProps;

export const User = (props: UserProps) => {
  const userIds = useFilteredUsers(props.isActive);
  const dispatch = useDispatch();

  useEffect(() => {
    startLoadingUsers(dispatch);
  }, [props.isActive, dispatch]);

  useAllowJumpingToUserByKeyboard();

  return (
    <>
      <ScrollToTop />
      <div className={styles.wrapper}>
        <div className={styles.addUserButton}>
          <CreateUserInlineFormView
            isActive={props.showCreateUserForm || false}
          />
        </div>
        <NavTabMenus
          margin="2rem 1rem"
          breakpoint={320}
          label={<FormattedMessage id="USER_ACTIVE_LINK" />}
          tabs={[
            {
              to: '/user/active',
              message: <FormattedMessage id="USER_ACTIVE_LINK" />,
            },
            {
              to: '/user/inactive',
              message: <FormattedMessage id="USER_INACTIVE_LINK" />,
            },
          ]}
        />
        <UserList userIds={userIds} />
      </div>
    </>
  );
};

const useAllowJumpingToUserByKeyboard = () => {
  const [typedUserId, setTypedUserId] = React.useState('');

  const history = useHistory();

  const keyDownHandler = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const targetRoute = `/user/${typedUserId}`;
        setTypedUserId('');
        history.push(targetRoute);
        return;
      }

      if (e.key === 'Backspace') {
        setTypedUserId(typedUserId.slice(0, -1));
        return;
      }

      const isPrintableKey = e.key.length === 1;

      if (!isPrintableKey) {
        return;
      }

      setTypedUserId(typedUserId + e.key);
    },
    [history, typedUserId]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler, typedUserId]);
};
