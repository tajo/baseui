/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  STATE_CHANGE_TYPE,
  TRIGGER_TYPE,
} from './constants.js';

export type PopoverPlacementT = $Keys<typeof PLACEMENT>;

export type TriggerTypeT = $Keys<typeof TRIGGER_TYPE>;

export type AccessibilityTypeT = $Keys<typeof ACCESSIBILITY_TYPE>;

export type StateT = {
  isOpen: boolean,
};

export type StateChangeTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type ContentRenderPropT = () => React.Node;

export type StatefulContentRenderPropT = ({
  close: () => void,
}) => React.Node;

export type OverridesT = {
  Body?: OverrideT<SharedStylePropsArgT>,
  Arrow?: OverrideT<SharedStylePropsArgT>,
  Inner?: OverrideT<SharedStylePropsArgT>,
};

// re-exports to maintain same public interface
export type ChildT = React.Node;
export type ChildrenT = React.ChildrenArray<ChildT>;

// Props shared by all flavors of popover
export type BasePopoverPropsT = {
  accessibilityType?: AccessibilityTypeT,
  id?: string,
  ignoreBoundary?: boolean,
  onMouseEnterDelay?: number,
  onMouseLeaveDelay?: number,
  overrides?: OverridesT,
  placement: PopoverPlacementT,
  showArrow?: boolean,
  triggerType: TriggerTypeT,
};

// Props for stateless render logic
export type PopoverPropsT = BasePopoverPropsT & {
  children: React.Node,
  content: React.Node | ContentRenderPropT,
  isOpen: boolean,
  onBlur?: () => void,
  onClick?: (e: Event) => void,
  onClickOutside?: () => void,
  onEsc?: () => void,
  onFocus?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

// Props for stateful wrapper
export type StatefulPopoverPropsT = BasePopoverPropsT & {
  children: React.Node,
  content: React.Node | StatefulContentRenderPropT,
  dismissOnClickOutside: boolean,
  dismissOnEsc: boolean,
  initialState?: StateT,
  onClose?: () => void,
  onOpen?: () => void,
  stateReducer?: StateReducerT,
};

// Props for state container
export type StatefulPopoverContainerPropsT = $Diff<
  StatefulPopoverPropsT,
  {children: React.Node},
> & {
  children: (props: $Diff<PopoverPropsT, {children: React.Node}>) => React.Node,
};

export type PopoverPropsWithoutChildrenT = $Diff<
  PopoverPropsT,
  {children: React.Node},
>;

export type OffsetT = {
  top: number,
  left: number,
};

export type PopperOffsetT = {
  top?: number | null,
  left?: number | null,
};

export type PopperDataObjectT = {
  offsets: {
    arrow?: PopperOffsetT,
    popper: PopperOffsetT,
  },
  placement: string,
};

export type PopperOptionsT = {
  placement: string,
  modifiers: {
    arrow: {},
    computeStyle: {},
    applyStyle: {},
    applyReactStyle: {
      fn: (data: PopperDataObjectT) => void,
    },
  },
};

export type PopoverPrivateStateT = {
  isAnimating: boolean,
  arrowOffset: OffsetT,
  popoverOffset: OffsetT,
  placement: PopoverPlacementT,
};

export type SharedStylePropsArgT = {
  $arrowOffset: OffsetT,
  $isAnimating: boolean,
  $isOpen: boolean,
  $popoverOffset: OffsetT,
  $placement: PopoverPlacementT,
  $showArrow: boolean,
  children?: React.Node,

  // Styletron stuff
  $as?: string,
  // styled function wrapper related
  $style?: ?{},
  $ref?: React.Ref<*>,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};

export type AnchorPropsT = {
  'aria-controls'?: string | null,
  'aria-describedby'?: string | null,
  'aria-expanded'?: string,
  'aria-haspopup'?: string,
  'aria-owns'?: string | null,
  id?: string | null,
  onBlur?: () => void,
  onClick?: (e: Event) => void,
  onFocus?: () => void,
  onMouseEnter?: (e: Event) => void,
  onMouseLeave?: (e: Event) => void,
  ref?: React.Ref<*>,
  $ref?: React.Ref<*>,
  tabIndex?: '0',
};
