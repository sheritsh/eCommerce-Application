import React from 'react';
import classes from './Container.module.css';

interface ContainerProps {
  justifyContent?:
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'left'
    | 'right'
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'safe'
    | 'unsafe';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexGrow?: number;
  flexBasis?: string;
  flexShrink?: number;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  alignItems?:
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'left'
    | 'right'
    | 'normal'
    | 'self-start'
    | 'self-end'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'stretch'
    | 'safe'
    | 'unsafe';
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  flex?: 'none' | 'flex-grow' | 'flex-shrink' | 'flex-basis';
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ ...props }) => {
  return (
    <div
      className={classes.container}
      style={{
        justifyContent: props.justifyContent || 'flex-start',
        flexDirection: props.flexDirection || 'row',
        flexGrow: props.flexGrow || 0,
        flexBasis: props.flexBasis || 'auto',
        flexShrink: props.flexShrink || 1,
        flexWrap: props.flexWrap || 'nowrap',
        flex: props.flex || '0 1 auto',
        alignItems: props.alignItems || 'stretch',
        margin: props.margin || '0',
        padding: props.padding || '0',
        width: props.width || 'auto',
        height: props.height || 'auto',
        maxWidth: props.maxWidth || 'none',
      }}
    >
      {props.children}
    </div>
  );
};

export default Container;
