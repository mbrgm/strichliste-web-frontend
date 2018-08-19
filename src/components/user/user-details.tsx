import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { FormattedMessage } from 'react-intl';
import { CreateUserTransactionLink } from '.';
import { AppState, DefaultThunkAction } from '../../store';
import {
  User,
  startLoadingTransactions,
  startLoadingUserDetails,
} from '../../store/reducers';
import { BackButton } from '../common';
import { Currency } from '../currency';
import { ConnectedPayment, ConnectedTransactionListItem } from '../transaction';
import {
  AlertText,
  Card,
  Column,
  FixedFooter,
  ListItem,
  Row,
  SplitLayout,
} from '../ui';

interface StateProps {
  details: User;
}

interface ActionProps {
  startLoadingUserDetails(id: number): DefaultThunkAction;
  startLoadingTransactions(id: number): DefaultThunkAction;
}

type UserDetailsProps = StateProps &
  ActionProps &
  RouteComponentProps<{ id: number }>;

export class UserDetails extends React.Component<UserDetailsProps> {
  public componentDidMount(): void {
    this.props.startLoadingUserDetails(this.props.match.params.id);
    this.props.startLoadingTransactions(this.props.match.params.id);
  }

  public render(): JSX.Element {
    const user = this.props.details;
    if (!user) {
      return <>LOADING...</>;
    }
    return (
      <>
        <SplitLayout>
          <Card>
            <SplitLayout>
              {user.name}

              <AlertText value={user.balance}>
                <Currency value={user.balance} />
              </AlertText>
            </SplitLayout>

            <Row>
              <Column>
                <ConnectedPayment userId={user.id} />
              </Column>
            </Row>
            <div>
              <CreateUserTransactionLink />
            </div>
          </Card>
          <Card>
            <ListItem>
              <FormattedMessage id="USER_TRANSACTIONS" />
            </ListItem>
            {user.transactions &&
              Object.keys(user.transactions)
                .sort((a, b) => Number(b) - Number(a))
                .slice(0, 5)
                .map(id => <ConnectedTransactionListItem key={id} id={id} />)}
          </Card>
        </SplitLayout>
        <FixedFooter>
          <BackButton />
        </FixedFooter>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, { match }: UserDetailsProps) => ({
  details: getUser(state, match),
});

const mapDispatchToProps: ActionProps = {
  startLoadingUserDetails,
  startLoadingTransactions,
};

export const ConnectedUserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);

// tslint:disable-next-line:no-any
function getUser(state: AppState, match: any): User {
  return state.user[match.params.id];
}
