import React, { Component } from "react";
import { connect } from "react-redux";
import { push, replace, } from "react-router-redux";
import { addNavigationContext, removeNavigationContext } from "furmly-client";
import qs from "query-string";
import { navigationActions } from "../common/utils";

export default function(NestedComponent, loginUrl = "/", homeUrl = "/home") {
  function mapDispatchToProps(dispatch) {
    const navigation = { dispatch };
    return {
      dispatch,
      addNavigationContext: args => dispatch(addNavigationContext(args)),
      removeNavigationContext: () => dispatch(removeNavigationContext()),
      visible: args => navigationActions.alreadyVisible(navigation, args),
      replaceStack: arr =>
        navigationActions.replaceStack(
          arr,
          NestedComponent.navigationMap,
          navigation
        ),
      navigate: args =>
        navigationActions.navigate(
          args,
          NestedComponent.navigationContext,
          navigation
        ),
      setParams: args =>
        navigationActions.setParams(
          args,
          NestedComponent.navigationMap,
          navigation
        ),
      clearStack: () => navigationActions.clear(navigation),
      goBack: args => navigationActions.goBack(navigation, args)
    };
  }
  
  function mapStateToProps(state) {
    return {
      stack: state.furmly.navigation.stack,
      references: state.furmly.navigation._references
    };
  }
  class Base extends Component {
    constructor(props) {
      super(props);
      this.goBack = this.goBack.bind(this);
      this.noPlaceToGo = this.noPlaceToGo.bind(this);
      this.oneStepBack = this.oneStepBack.bind(this);
      this.openProcess = this.openProcess.bind(this);
      this.backToLogin = this.backToLogin.bind(this);
    }
    componentDidMount() {
      window.onpopstate = () => {
        // modify this function to do nothing if there is only one one item left in the stack if at home
        // and navigate backwards if it is outside.
        if (this.noPlaceToGo()) {
          if (NestedComponent.shouldClearStackOnEmpty) {
            window.onpopstate = null;
            this.props.clearStack();
            return;
          }
        } else this.oneStepBack("push");
      };
      this.props.addNavigationContext(NestedComponent.navigationContext);
      if (!this.props.stack.length && NestedComponent.pushVisible) {
        let segments = location.pathname.split("/");
        this.props.visible({
          key: "Furmly",
          params: Object.assign(
            { id: segments[segments.length - 1] },
            qs.parse(location.search)
          )
        });
      }
    }
    openProcess(item, shouldPush) {
      if (item.type == "FURMLY") {
        let arr = [
          {
            key: "Furmly",
            params: Object.assign(
              { id: item.value },
              { fetchParams: qs.parse(item.params || "") }
            )
          }
        ];
        if (this.props.stack.length) {
          arr.unshift(this.props.stack[0]);
        }
        return !shouldPush
          ? this.props.replaceStack(arr)
          : this.props.navigate(arr[0]);
      }

      return push(
        `${homeUrl}/${item.value[0].toUpperCase() + item.value.substring(1)}`
      );
    }
    componentWillUnmount() {
      this.props.removeNavigationContext();
    }
    backToLogin() {
      this.props.clearStack();
      this.props.dispatch(replace(loginUrl));
    }
    goBack() {
      if (this.noPlaceToGo()) {
        return this.props.history.goBack();
      } else {
        return this.oneStepBack();
      }
    }
    noPlaceToGo() {
      return this.props.stack.length == 0 || this.props.stack.length == 1;
    }
    oneStepBack() {
      return this.props.goBack({
        item: this.props.stack[this.props.stack.length - 1],
        references: this.props.references
      });
    }

    render() {
      return (
        <NestedComponent
          location={this.props.location}
          emptyStack={!!!this.props.stack.length}
          openProcess={this.openProcess}
          match={this.props.match}
          backToLogin={this.backToLogin}
        />
      );
    }
  }
  return {
    getComponent: () =>
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(Base),
    Base,
    mapDispatchToProps,
    mapStateToProps
  };
}
