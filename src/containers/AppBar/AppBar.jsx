import React, { Component } from "react";
import LeftMenu from "../../components/AppBar/LeftMenu/LeftMenu";
import logo from "../../images/AppBar/logo.png";
import "../../sass/appBar.sass";
import RightMenu from "../../components/AppBar/RightMenu/RightMenu";
import { connect } from "react-redux";
import { logout } from "../../actions/Auth";

class AppBar extends Component {
  render() {
    return (
      <div className="app-bar">
        <div className="app-bar_left-container">
          <img className="app-bar_logo" src={logo} alt="Logo" />
          <LeftMenu />
        </div>
        <RightMenu
          isAuth={this.props.isAuth}
          onLogout={() => this.props.onLogout(this.props.history)}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.App.isAuth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: (history) => {
      dispatch(logout(history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
