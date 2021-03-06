declare module 'react-native-responsive-screen' {
  import { Component } from 'react';

  export function widthPercentageToDP(widthPercent: string | number): number;
  export function widthPercentageOfComponentToDP(widthPercent: string | number,componentWidth : number): number;
  export function heightPercentageToDP(widthPercent: string | number): number;
  export function heightPercentageOfComponentToDP(widthPercent: string | number,componentHeight: number): number;
  export function listenOrientationChange(screenClassComponent: Component<any, any>): void;
  export function useOrientationListener(): [string, number, number];
  export function removeOrientationListener(screenClassComponent: Component<any,any>): void;
}
