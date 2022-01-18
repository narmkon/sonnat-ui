import makeStyles from "../styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      darkMode,
      zIndexes,
      direction,
      radius,
      spacings: { spaces },
      swatches: { grey },
      typography: { pxToRem, variants, fontFamily }
    } = theme;

    return {
      root: {
        direction,
        fontFamily: fontFamily[direction],
        opacity: 0,
        maxWidth: pxToRem(192),
        minWidth: pxToRem(56),
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: zIndexes.popover,
        position: "absolute",
        MozBackfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        transform: "translate(0, 0) scale(0.8)",
        transition:
          "transform 360ms cubic-bezier(0, 0, 0.2, 1) 100ms, opacity 200ms ease 100ms"
      },
      container: {
        padding: [[spaces[3].rem, spaces[5].rem]],
        borderRadius: radius.small,
        position: "relative",
        zIndex: 2,
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: !darkMode ? grey[900] : grey[700],
        "&:before": {
          content: '""',
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          borderRadius: radius.small,
          boxShadow: `0 2px 8px 0 rgba(0, 0, 0, 0.12)`,
          zIndex: -1
        },
        "&:after": {
          position: "absolute",
          width: pxToRem(12),
          height: pxToRem(12),
          backgroundColor: !darkMode ? grey[900] : grey[700],
          zIndex: -1
        }
      },
      text: { ...variants.caption, color: colors.white },
      tail: {
        width: pxToRem(12),
        height: pxToRem(12),
        backgroundColor: colors.transparent,
        position: "absolute",
        zIndex: 1,
        opacity: 0,
        visibility: "hidden",
        transition: "opacity 200ms ease 100ms, visibility 200ms ease 100ms",
        "&:before": {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          boxShadow: `2px 2px 8px 0 rgba(0, 0, 0, 0.16)`,
          zIndex: -1
        }
      },
      open: {
        opacity: 1,
        "&$tailed": {
          "&$top": { transform: `translate(0, ${pxToRem(-16)}) scale(1)` },
          "&$bottom": { transform: `translate(0, ${pxToRem(16)}) scale(1)` },
          "&$right": { transform: `translate(${pxToRem(16)}, 0) scale(1)` },
          "&$left": { transform: `translate(${pxToRem(-16)}, 0) scale(1)` }
        }
      },
      tailed: {
        "& $container:after, & $container:before": { content: '""' },
        "& $tail": {
          opacity: 1,
          visibility: "visible",
          "&:before": { content: '""' }
        },
        "&$top": {
          "& $container:after": {
            borderRadius: "0",
            borderBottomRightRadius: pxToRem(2),
            transform: "translateY(50%) rotate(45deg)",
            bottom: "0"
          },
          "& $tail": {
            transform: "translateY(50%) rotate(45deg)",
            bottom: "0",
            "&:before": {
              borderRadius: "0",
              borderBottomRightRadius: pxToRem(2)
            }
          }
        },
        "&$right": {
          "& $container:after": {
            borderRadius: "0",
            borderBottomLeftRadius: pxToRem(2),
            transform: "translateX(-50%) rotate(45deg)",
            left: "0"
          },
          "& $tail": {
            transform: "translateX(-50%) rotate(45deg)",
            left: "0",
            "&:before": {
              borderRadius: "0",
              borderBottomLeftRadius: pxToRem(2)
            }
          }
        },
        "&$left": {
          "& $container:after": {
            borderRadius: "0",
            borderTopRightRadius: pxToRem(2),
            transform: "translateX(50%) rotate(45deg)",
            right: "0"
          },
          "& $tail": {
            transform: "translateX(50%) rotate(45deg)",
            right: "0",
            "&:before": {
              borderRadius: "0",
              borderTopRightRadius: pxToRem(2)
            }
          }
        },
        "&$bottom": {
          "& $container:after": {
            borderRadius: "0",
            borderTopLeftRadius: pxToRem(2),
            transform: "translateY(-50%) rotate(45deg)",
            top: "0"
          },
          "& $tail": {
            transform: "translateY(-50%) rotate(45deg)",
            top: "0",
            "&:before": {
              borderRadius: "0",
              borderTopLeftRadius: pxToRem(2)
            }
          }
        }
      },
      floated: { transform: `translate(0, ${pxToRem(-8)}) scale(1)` },
      top: { transform: `translate(0, ${pxToRem(-8)}) scale(1)` },
      left: { transform: `translate(${pxToRem(-8)}, 0) scale(1)` },
      right: { transform: `translate(${pxToRem(8)}, 0) scale(1)` },
      bottom: { transform: `translate(0, ${pxToRem(8)}) scale(1)` }
    };
  },
  { name: "SonnatTooltip" }
);

export default useStyles;
