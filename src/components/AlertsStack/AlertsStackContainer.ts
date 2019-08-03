import { connect } from 'react-redux';
import { IStoreState } from '../../store';
import AlertsStack from './AlertsStack';

const mapStateToProps = ({ alerts }: IStoreState) => ({
  alerts: alerts ? Object.values(alerts) : undefined
});

export default connect(mapStateToProps)(AlertsStack);
