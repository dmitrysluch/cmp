import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getReferralCabinet,
  getWallets,
  setPreloader,
} from "../../actions/User";
import MenuPersonalArea from "../../components/MenuPersonalArea";
import ListedUsers from "../../components/PartnerCabinet/ListedUsers";
import PartnersTable from "../../components/PartnerCabinet/PartnersTable";
import PartnerStatistics from "../../components/PartnerCabinet/PartnerStatistics";
import PartnerUrl from "../../components/PartnerCabinet/PartnerUrl";
import Preloader from "../../components/Preloader";

import "../../sass/partnerCabinet/partnerCabinet.sass";
export class PartnerCabinet extends Component {
  componentDidMount() {
    const {
      inviterlink,
      onGetReferralCabinet,
      onGetWallets,
      onSetPreloader,
    } = this.props;
    if (!inviterlink || inviterlink.length === 0) {
      onSetPreloader(true);
    }
    onGetWallets();
    onGetReferralCabinet();
  }
  render() {
    const { isPreloader, inviterlink, partners, referrals } = this.props;
    return (
      <div className="partner-cabinet-area">
        <p className="partner-cabinet__title">Партнерский кабинет</p>
        <MenuPersonalArea type={false} />
        {isPreloader ? (
          <Preloader />
        ) : (
          <div className="partner-cabinet-area__body">
            <div className="partner-cabinet__left-block">
              <PartnerUrl inviterlink={inviterlink} />
            </div>
            <div className="partner-cabinet__right-block">
              <PartnersTable partners={partners} />
              <PartnerStatistics referrals={referrals} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  inviterlink: state.User.inviterlink,
  isPreloader: state.User.isPreloader,
  partners: state.User.partners,
  referrals: state.User.referrals,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onGetWallets: () => {
      dispatch(getWallets());
    },
    onGetReferralCabinet: () => {
      dispatch(getReferralCabinet());
    },
    onSetPreloader: (isPreloader) => {
      dispatch(setPreloader(isPreloader));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PartnerCabinet);
