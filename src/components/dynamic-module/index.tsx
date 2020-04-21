import React, {Component, lazy, Suspense} from "react";
import {Spring} from "react-spring/renderprops";

export interface DynamicModulePropsInterface {
  placeholder: any;
  children?:
    | (() => React.ReactNode | React.ReactNode[])
    | React.ReactNode
    | React.ReactNode[];
  component: () => any;

  [prop: string]: any;

  style?: any;
}

export interface DynamicModuleStateInterface {
  initializing: boolean;
  Component: React.LazyExoticComponent<any> | null;
}

export default class DynamicModule extends Component<DynamicModulePropsInterface, DynamicModuleStateInterface> {
  public state = {
    Component: null,
    initializing: false
  };

  private onAnimationFrameCallback = 0;

  public componentDidMount() {
    this.setState({
      Component: lazy(this.props.component),
      initializing: true
    });
  }

  public componentWillUnmount() {
    window.cancelAnimationFrame(this.onAnimationFrameCallback);
  }

  private onInitialized = () => {
    this.onAnimationFrameCallback = window.requestAnimationFrame(() => {
      this.setState({
        initializing: false
      });
    });
  };

  public render() {
    const {children, placeholder, style = {}, ...rest} = this.props;
    const {Component, initializing} = this.state;

    const defaultStyles = {
      width: "100%"
    };

    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          ...style
        }}
      >
        <Suspense fallback={placeholder}>
          <Spring
            from={{
              ...defaultStyles,
              opacity: !initializing
            }}
            to={{
              ...defaultStyles,
              opacity: initializing
            }}
          >
            {props => (
              // @ts-ignore
              <div style={props}>{React.cloneElement(placeholder)}</div>
            )}
          </Spring>
          <Spring
            from={{
              opacity: initializing,
            }}
            to={{
              opacity: !initializing,
            }}
          >
            {props =>
              Component && (
                //@ts-ignore
                <Component
                  {...rest}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    ...props
                  }}
                  onInitialized={this.onInitialized}
                />
              )
            }
          </Spring>
        </Suspense>
      </div>
    );
  }
}