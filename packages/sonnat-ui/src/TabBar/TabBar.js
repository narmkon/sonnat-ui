import React, { useMemo, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import createClass from "classnames";
import { withResizeDetector } from "react-resize-detector";
import throttle from "lodash.throttle";
import Icon from "../Icon";
import TabBarContext from "./context";
import { makeStyles, useTheme } from "../styles";
import {
  setRef,
  useControlled,
  getNormalizedScrollLeft,
  detectScrollType
} from "../utils";

const componentName = "TabBar";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      darkMode,
      direction,
      typography: { pxToRem, fontFamily }
    } = theme;

    return {
      root: {
        direction,
        fontFamily: fontFamily[direction],
        display: "flex",
        position: "relative",
        height: pxToRem(48),
        overflow: "hidden"
      },
      scrollBehavior: {
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch"
      },
      listWrapper: {
        extend: "scrollBehavior",
        flex: [[1, 0]],
        margin: 0,
        display: "flex",
        position: "relative",
        minHeight: pxToRem(64),
        alignItems: "flex-start",
        justifyContent: "flex-start",
        zIndex: "1",
        "&::-webkit-scrollbar-track": {
          display: "none",
          backgroundColor: colors.transparent
        },
        "&::-webkit-scrollbar": {
          display: "none",
          backgroundColor: colors.transparent
        },
        "&::-webkit-scrollbar-thumb": {
          display: "none",
          backgroundColor: colors.transparent
        },
        "&::-webkit-scrollbar-thumb:hover": {
          display: "none",
          backgroundColor: colors.transparent
        }
      },
      listContainer: {
        extend: "scrollBehavior",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        "&::-webkit-scrollbar-track": {
          display: "none",
          backgroundColor: colors.transparent
        },
        "&::-webkit-scrollbar": {
          display: "none",
          backgroundColor: colors.transparent
        },
        "&::-webkit-scrollbar-thumb": {
          display: "none",
          backgroundColor: colors.transparent
        },
        "&::-webkit-scrollbar-thumb:hover": {
          display: "none",
          backgroundColor: colors.transparent
        }
      },
      indicatorSlider: {
        left: 0,
        bottom: 0,
        top: pxToRem(48),
        height: pxToRem(2),
        width: "100%",
        content: '""',
        position: "absolute",
        transition:
          "transform 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 125ms ease 250ms, left 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        backgroundColor: colors.transparent,
        transformOrigin: "0% 0%"
      },
      fader: {
        backgroundColor: colors.transparent,
        zIndex: 2,
        display: "flex",
        width: pxToRem(32),
        minWidth: pxToRem(32),
        height: "100%",
        position: "relative",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: "0",
        "&:hover": {
          "& $faderIcon": {
            color: !darkMode ? colors.primary.origin : colors.primary.light
          }
        }
      },
      startFader: {},
      endFader: {},
      disabledFader: {
        visibility: "hidden"
      },
      faderIcon: {
        color: colors.text.hint,
        transition: "color 360ms ease"
      },
      scrollable: {
        "& $listWrapper": {
          overflowX: "auto"
        }
      },
      fluid: {
        width: "100%",
        "& $listContainer": { flex: [[1, 0]] }
      }
    };
  },
  { name: `Sonnat${componentName}` }
);

const mapIdentifierToIndex = (value, index, map) => {
  map.set(value, index);
  return map;
};

const getIndexOfIdentifier = (value, map) => {
  return map.get(value);
};

const TabBar = React.memo(
  React.forwardRef(function TabBar(props, ref) {
    const {
      className,
      activeTab,
      defaultActiveTab,
      onChange,

      // These properties are passed from `react-resize-detector`.
      // We are trying to exclude them from the `otherProps` property.

      /* eslint-disable no-unused-vars, react/prop-types */
      targetRef,
      height: rootHeight,
      /* eslint-enable no-unused-vars, react/prop-types */

      children: childrenProp,
      width: parentWidth,
      scrollHandleVisibility = "auto",
      scrollable = false,
      dense = false,
      fluid = false,
      ...otherProps
    } = props;

    const localClass = useStyles();
    const theme = useTheme();

    const isRtl = theme.direction === "rtl";

    const padding = 0;

    const indicatorRef = useRef();
    const parentRef = useRef();
    const scrollerRef = useRef();
    const listRef = useRef();

    const identifierToIndex = new Map();

    const [indicatorState, setIndicatorState] = useState({
      scaleX: 1,
      x: 0,
      bgColor: theme.colors.transparent
    });

    const [isResized, setResized] = useState(false);
    const [scrollButtonsDisplayState, setScrollButtonsDisplayState] = useState({
      start: false,
      end: false
    });

    const indicatorProps = useMemo(() => {
      return {
        className: localClass.indicatorSlider,
        style: {
          backgroundColor: indicatorState.bgColor,
          left: indicatorState.x,
          transform: `translateY(-100%) scaleX(${indicatorState.scaleX})`,
          WebkitTransform: `translateY(-100%) scaleX(${indicatorState.scaleX})`,
          MozTransform: `translateY(-100%) scaleX(${indicatorState.scaleX})`,
          msTransform: `translateY(-100%) scaleX(${indicatorState.scaleX})`
        },
        ref: node => {
          indicatorRef.current = node;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indicatorState]);

    const [value, setValue] = useControlled(
      activeTab,
      defaultActiveTab,
      componentName
    );

    if (process.env.NODE_ENV !== "production") {
      if (fluid && scrollable) {
        // eslint-disable-next-line no-console
        console.error(
          "Sonnat: You can not use the `fluid={true}` and `scrollable={true}` properties " +
            "at the same time on a `TabBar` component."
        );
      }
    }

    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) return null;

      const childIdentifier =
        child.props.identifier === undefined
          ? childIndex
          : child.props.identifier;

      mapIdentifierToIndex(childIdentifier, childIndex, identifierToIndex);

      childIndex += 1;

      return React.cloneElement(child, {
        active: childIdentifier === value,
        identifier: childIdentifier
      });
    });

    const getChildren = index => {
      return listRef.current.children[index];
    };

    const getScrollerMeta = () => {
      const scrollerNode = scrollerRef.current;
      let meta;

      if (scrollerNode) {
        const rect = scrollerNode.getBoundingClientRect();

        meta = {
          clientWidth: scrollerNode.clientWidth,
          scrollLeft: scrollerNode.scrollLeft,
          scrollTop: scrollerNode.scrollTop,
          scrollLeftNormalized: getNormalizedScrollLeft(
            scrollerNode,
            theme.direction
          ),
          scrollWidth: scrollerNode.scrollWidth,
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom
        };
      }

      return meta;
    };

    const getTabMeta = () => {
      const scrollerNode = scrollerRef.current;
      let meta;

      if (scrollerNode && value != null) {
        const tab = getChildren(getIndexOfIdentifier(value, identifierToIndex));

        if (tab) {
          const tabRect = tab.getBoundingClientRect();

          meta = {
            clientWidth: tab.clientWidth,
            clientHeight: tab.clientHeight,
            top: tabRect.top,
            left: tabRect.left,
            right: tabRect.right,
            bottom: tabRect.bottom
          };
        } else if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error(
            [
              `Sonnat: The identifier provided to the TabBar component is invalid. None of the TabBar's children match with \`${
                typeof value === "string" ? `'${value}'` : value
              } (${typeof value})\`.`,
              identifierToIndex.keys
                ? `You can provide one of the following values: { ${Array.from(
                    identifierToIndex.keys()
                  ).join(", ")} }.`
                : null
            ].join("\n")
          );
        }
      }

      return meta;
    };

    const updateIndicatorState = () => {
      const tabMeta = getTabMeta();
      const scrollerMeta = getScrollerMeta();

      if (tabMeta && scrollerMeta) {
        let x = 0;

        const correction = isRtl
          ? scrollerMeta.scrollLeftNormalized +
            scrollerMeta.clientWidth -
            scrollerMeta.scrollWidth
          : scrollerMeta.scrollLeft;

        x = tabMeta.left - scrollerMeta.left + correction;

        setIndicatorState({
          x,
          scaleX: tabMeta.clientWidth / scrollerMeta.clientWidth,
          bgColor: theme.darkMode
            ? theme.colors.primary.origin
            : theme.colors.primary.light
        });
      }
    };

    const getScrollSize = () => {
      const containerSize = scrollerRef.current.clientWidth;
      let totalSize = 0;

      const children = Array.from(listRef.current.children);

      for (let i = 0; i < children.length; i += 1) {
        const tab = children[i];

        if (totalSize + tab.clientWidth > containerSize) break;
        totalSize += tab.clientWidth;
      }
      return totalSize + 2 * padding;
    };

    const getAvgScrollAmount = () => {
      const children = Array.from(listRef.current.children);

      return getScrollSize() / children.length;
    };

    const updateScrollButtonState = () => {
      if (scrollable && scrollHandleVisibility !== "off") {
        const { scrollWidth, clientWidth } = scrollerRef.current;

        let showStartScrollButton;
        let showEndScrollButton;

        const scrollLeft = getNormalizedScrollLeft(
          scrollerRef.current,
          theme.direction
        );

        // use 1 for the potential rounding error with browser zooms.
        showStartScrollButton = isRtl
          ? scrollLeft < scrollWidth - clientWidth - 1
          : scrollLeft > 1;
        showEndScrollButton = !isRtl
          ? scrollLeft < scrollWidth - clientWidth - 1
          : scrollLeft > 1;

        if (
          showStartScrollButton !== scrollButtonsDisplayState.start ||
          showEndScrollButton !== scrollButtonsDisplayState.end
        ) {
          setScrollButtonsDisplayState({
            start: showStartScrollButton,
            end: showEndScrollButton
          });
        }
      }
    };

    const scroll = amount => {
      // TODO: animate the scrollLeft value change
      scrollerRef.current.scrollLeft = amount;
    };

    const moveScroller = amount => {
      let scrollValue = scrollerRef.current.scrollLeft;

      scrollValue += amount * (isRtl ? -1 : 1);
      // Fix for Edge
      scrollValue *= isRtl && detectScrollType() === "reverse" ? -1 : 1;

      scroll(scrollValue);
    };

    const scrollIntoView = () => {
      const scrollerMeta = getScrollerMeta();
      const tabMeta = getTabMeta();

      if (!tabMeta || !scrollerMeta) return;

      if (tabMeta.left - scrollerMeta.left < padding) {
        // left side of tab is out of view
        scroll(
          scrollerMeta.scrollLeft + (tabMeta.left - scrollerMeta.left) - padding
        );
      } else if (tabMeta.right - scrollerMeta.right > -padding) {
        // right side of tab is out of view
        scroll(
          scrollerMeta.scrollLeft +
            (tabMeta.right - scrollerMeta.right) +
            padding
        );
      }
    };

    const changeListener = (e, identifier) => {
      if (onChange) onChange(e, identifier);

      // Switch tab if-and-only-if it is a uncontrolled component
      setValue(identifier);
    };

    const startScrollButtonHandler = () => {
      moveScroller(-getAvgScrollAmount());
    };

    const endScrollButtonHandler = () => {
      moveScroller(getAvgScrollAmount());
    };

    useEffect(() => {
      if (parentWidth) setResized(true);
    }, [parentWidth]);

    if (isResized) {
      updateIndicatorState();
      updateScrollButtonState();
      setResized(false);
    }

    useEffect(() => {
      updateIndicatorState();
      updateScrollButtonState();
      scrollIntoView();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <TabBarContext.Provider
        value={{
          dense,
          fluid,
          scrollable,
          onChange: changeListener
        }}
      >
        <div
          className={createClass(localClass.root, className, {
            [localClass.scrollable]: scrollable,
            [localClass.fluid]: fluid
          })}
          ref={node => {
            if (ref) setRef(ref, node);
            parentRef.current = node;
          }}
          {...otherProps}
        >
          {scrollable && (
            <div
              aria-disabled={!scrollButtonsDisplayState.start}
              role="button"
              className={createClass(localClass.startFader, localClass.fader, {
                [localClass.disabledFader]: !scrollButtonsDisplayState.start
              })}
              onClick={startScrollButtonHandler}
            >
              <Icon
                identifier={
                  isRtl ? "arrow-right-large-o" : "arrow-left-large-o"
                }
                className={localClass.faderIcon}
              />
            </div>
          )}
          <div
            ref={scrollerRef}
            className={localClass.listWrapper}
            onScroll={throttle(() => {
              updateScrollButtonState();
            }, 250)}
          >
            <div {...indicatorProps}></div>
            <div
              ref={listRef}
              className={localClass.listContainer}
              role="tablist"
            >
              {children}
            </div>
          </div>
          {scrollable && (
            <div
              aria-disabled={!scrollButtonsDisplayState.end}
              role="button"
              className={createClass(localClass.endFader, localClass.fader, {
                [localClass.disabledFader]: !scrollButtonsDisplayState.end
              })}
              onClick={endScrollButtonHandler}
            >
              <Icon
                identifier={
                  isRtl ? "arrow-left-large-o" : "arrow-right-large-o"
                }
                className={localClass.faderIcon}
              />
            </div>
          )}
        </div>
      </TabBarContext.Provider>
    );
  })
);

TabBar.displayName = componentName;

TabBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  activeTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultActiveTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  scrollable: PropTypes.bool,
  fluid: PropTypes.bool,
  dense: PropTypes.bool,
  width: PropTypes.number,
  scrollHandleVisibility: PropTypes.oneOf(["auto", "off"]),
  onChange: PropTypes.func
};

export default withResizeDetector(TabBar, {
  handleWidth: true,
  skipOnMount: true,
  refreshMode: "debounce",
  refreshRate: 250
});
