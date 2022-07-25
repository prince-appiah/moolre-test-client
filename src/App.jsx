import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages";
import Products from "./pages/CreateProduct";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/products/add" component={Products} />
      </Switch>
    </>
  );
};

export default App;
