import React from "react";
import { Redirect, Route, Switch } from "react-router";
import SignIn from "./containers/Auth/SignIn";
import SignUp from "./containers/Auth/SignUp";
import PersonalArea from "./containers/PersonalArea/PersonalArea";
import NotFound from "./components/NotFound/NotFound";
import PartnerCabinet from "./containers/PartnerCabinet/PartnerCabinet";

// генерирует Route компонент
const CreateRoute = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <CreateRoute key={route.key} {...route} />;
      })}
      <Route component={() => NotFound()} />
    </Switch>
  );
}

const ROUTES = [
  {
    path: "/",
    key: "ROOT_1",
    exact: true,
    component: () => <Redirect to={"/auth/signIn"} />,
  },
  { path: "/home", key: "ROOT", exact: true, component: () => <h1>HOME</h1> },
  {
    path: "/auth",
    key: "AUTH",
    component: RenderRoutes,
    routes: [
      {
        path: "/auth/signIn",
        key: "AUTH_SIGNIN",
        component: SignIn,
      },
      {
        path: "/auth/signUp",
        key: "AUTH_SIGNUP",
        component: SignUp,
      },
    ],
  },
  {
    path: "/lk",
    key: "LK",
    component: (props) => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        return <RenderRoutes {...props} />;
      } else {
        alert("You need to log in to access app routes");
        return <Redirect to={"/"} />;
      }
    },
    routes: [
      {
        path: "/lk/balance",
        key: "LK_BALANCE",
        component: PersonalArea,
      },
      {
        path: "/lk/partner-cabinet",
        key: "LK_PARTNER_CABINET",
        component: PartnerCabinet,
      },
    ],
  },
];

export default ROUTES;
