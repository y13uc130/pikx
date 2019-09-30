import React, { PureComponent } from 'react';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import FullPageLoader from '../../components/FullPageLoader';
import api from '../../utils/api';
import { clearBookingId, clearCartData } from '../../utils/localStorage';
import routePath from '../../routePath';

export class BookingStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    })
    clearBookingId();
    clearCartData();
    const { history, match: {params} }  = this.props;
    if(params && !!params.id) {
      api.get(`/booking/${params.id}`).then((res)=>{
        if(res && res.data && !!res.data.success)  {
          localStorage.setItem('booking_id', params.id);
          history.push(routePath.homePath);
        } else {
          history.push(routePath.errorPath);
        }
        this.setState({
          loading: false
        })
      }).catch(err=>{
        history.push(routePath.errorPath);
        this.setState({
          loading: false
        })
      })
    }

  }
  
  render() {
    const {
      loading
    } = this.state;
    return (
      <div className="BookingStatusPage">
        {loading && <FullPageLoader />}
      </div>
    );
  }
}

export default compose(withRouter)(BookingStatus);
