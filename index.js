import React, {useState, useEffect} from 'react';
// packages
import { Dimensions, PixelRatio, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const AndroidVersion = DeviceInfo.getSystemVersion();

const modifier = AndroidVersion === "8.1.0" ? StatusBar.currentHeight * 2 : 0

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height - modifier;

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @param  {number} componentWidth the width of the component
 * @return {number}              The calculated dp depending on current device's screen width.
 */
const widthPercentageOfComponentToDP = (widthPercent, componentWidth) => {
  // Parse string percentage input and convert it to number.
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(componentWidth * elemWidth / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @param  {number} componentHeight the height of the component
 * @return {number}               The calculated dp depending on current device's screen height.
 */
const heightPercentageOfComponentToDP = (heightPercent, componentHeight) => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(componentHeight * elemHeight / 100);
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers 
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
const listenOrientationChange = that => {
  that.orientationChangeHandler = newDimensions => {
    screenWidth = newDimensions.window.width;
    screenHeight = newDimensions.window.height;

    // Trigger screen's rerender with a state update of the orientation variable
    that.setState({
      orientation: screenWidth < screenHeight ? 'portrait' : 'landscape'
    });
  }
  Dimensions.addEventListener('change', that.orientationChangeHandler);
};

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
const removeOrientationListener = that => {
  Dimensions.removeEventListener('change', that.orientationChangeHandler);
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers 
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 * @param {object} that Screen's class component this variable. The function needs it to
 *                      invoke setState method and trigger screen rerender (this.setState()).
 */
const useOrientationListener = ()=>  {
  const [orientation, setOrientation] = useState(Dimensions.get('window').width < Dimensions.get('window').height ? 'potrait' : 'landscape');
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  
  useEffect(()=>{
   const orientationChangeHandler = (newDimensions)=>{
     screenWidth = newDimensions.window.width;
     screenHeight = newDimensions.window.height; 
     const _orientation = screenWidth < screenHeight ? 'potrait' : 'landscape';
     setOrientation(_orientation);
     setWidth(screenWidth);
     setHeight(screenHeight);
   }
   Dimensions.addEventListener('change',orientationChangeHandler);
    return(()=>{
      Dimensions.removeEventListener('change',orientationChangeHandler);
    })
  },[]);
  
  return [orientation,screenWidth,screenHeight];
}

export {
  widthPercentageToDP,
  heightPercentageToDP,
  widthPercentageOfComponentToDP,
  heightPercentageOfComponentToDP,
  listenOrientationChange,
  removeOrientationListener,
  useOrientationListener
};
