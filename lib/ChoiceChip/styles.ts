import { lighten, darken } from "../styles/colorUtils";
import makeStyles from "../styles/makeStyles";

export type VariantColorSelectionCombo =
  | "filledDefaultSelected"
  | "filledPrimarySelected"
  | "filledSecondarySelected"
  | "outlinedDefaultSelected"
  | "outlinedPrimarySelected"
  | "outlinedSecondarySelected";

export type VariantUnselectionCombo = "filledUnselected" | "outlinedUnselected";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      darkMode,
      direction,
      spacings: { spaces },
      swatches: { blue, grey },
      mixins: { asIconWrapper, disableUserSelect },
      typography: { pxToRem, setText, fontFamily }
    } = theme;

    const filledDefaultMainBg = colors.text.secondary;
    const filledPrimarySelectedMainBg = !darkMode
      ? colors.primary.origin
      : colors.primary.light;

    const filledSecondarySelectedMainBg = !darkMode
      ? colors.secondary.origin
      : colors.secondary.light;

    const filledDefault = {
      background: {
        main: filledDefaultMainBg,
        hover: !darkMode
          ? colors.createBlackColor({ alpha: 0.48 }, true)
          : colors.createWhiteColor({ alpha: 0.87 }, true),
        active: !darkMode
          ? colors.createBlackColor({ alpha: 0.64 }, true)
          : colors.createWhiteColor({ alpha: 0.56 }, true),
        disabled: !darkMode ? grey[50] : grey[900]
      },
      text: colors.getContrastColorOf(filledDefaultMainBg)
    };

    const filledPrimarySelected = {
      background: {
        main: filledPrimarySelectedMainBg,
        hover: lighten(filledPrimarySelectedMainBg, 0.15),
        active: darken(filledPrimarySelectedMainBg, 0.15),
        disabled: colors.createPrimaryColor({ alpha: 0.12 }, true)
      },
      text: colors.getContrastColorOf(filledPrimarySelectedMainBg)
    };

    const filledSecondarySelected = {
      background: {
        main: filledSecondarySelectedMainBg,
        hover: lighten(filledSecondarySelectedMainBg, 0.15),
        active: darken(filledSecondarySelectedMainBg, 0.15),
        disabled: colors.createSecondaryColor({ alpha: 0.12 }, true)
      },
      text: colors.getContrastColorOf(filledSecondarySelectedMainBg)
    };

    return {
      root: {
        ...setText(),
        ...disableUserSelect(),
        direction,
        fontFamily: fontFamily[direction],
        padding: `0 ${spaces[5].rem}`,
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: pxToRem(2),
        verticalAlign: "middle",
        overflow: "hidden",
        position: "relative",
        zIndex: "1",
        flexShrink: "0",
        cursor: "pointer",
        transition:
          "color 360ms ease, background-color 360ms ease, border 360ms ease"
      },
      icon: {
        ...asIconWrapper(16),
        flexShrink: "0",
        transition: "color 360ms ease"
      },
      small: {
        height: pxToRem(20),
        fontSize: pxToRem(10),
        padding: `0 ${spaces[3].rem}`,
        lineHeight: 1.8,
        "& $icon": {
          ...asIconWrapper(14),
          ...(direction === "rtl"
            ? {
                marginRight: pxToRem(spaces[2].px - spaces[3].px),
                marginLeft: spaces[1].rem
              }
            : {
                marginLeft: pxToRem(spaces[2].px - spaces[3].px),
                marginRight: spaces[1].rem
              })
        }
      },
      medium: {
        height: pxToRem(28),
        fontSize: pxToRem(12),
        lineHeight: 1.6666666667,
        "& $icon": {
          ...(direction === "rtl"
            ? {
                marginRight: pxToRem(spaces[2].px - spaces[5].px),
                marginLeft: spaces[1].rem
              }
            : {
                marginLeft: pxToRem(spaces[2].px - spaces[5].px),
                marginRight: spaces[1].rem
              })
        }
      },
      large: {
        height: pxToRem(32),
        fontSize: pxToRem(14),
        lineHeight: 1.5714285714,
        "& $icon": {
          ...(direction === "rtl"
            ? {
                marginRight: pxToRem(spaces[3].px - spaces[5].px),
                marginLeft: spaces[1].rem
              }
            : {
                marginLeft: pxToRem(spaces[3].px - spaces[5].px),
                marginRight: spaces[1].rem
              })
        }
      },
      rounded: { borderRadius: pxToRem(16) },
      disabled: {
        pointerEvents: "none",
        "&:hover": {
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        }
      },
      selected: {},
      filled: {
        "&$disabled": {
          "&:not($selected)": {
            backgroundColor: !darkMode ? grey[50] : grey[900],
            color: !darkMode
              ? colors.createBlackColor({ alpha: 0.32 })
              : colors.createWhiteColor({ alpha: 0.12 }),
            "& $icon": {
              color: !darkMode
                ? colors.createBlackColor({ alpha: 0.32 })
                : colors.createWhiteColor({ alpha: 0.12 })
            }
          },
          "&$selected": {
            color: !darkMode
              ? colors.createBlackColor({ alpha: 0.32 }, true)
              : colors.createWhiteColor({ alpha: 0.24 }, true),
            "& $icon": {
              color: !darkMode
                ? colors.createBlackColor({ alpha: 0.32 }, true)
                : colors.createWhiteColor({ alpha: 0.24 }, true)
            }
          }
        }
      },
      outlined: {
        "&$disabled": {
          backgroundColor: colors.transparent,
          "&$selected": {
            color: !darkMode
              ? colors.createBlackColor({ alpha: 0.32 }, true)
              : colors.createWhiteColor({ alpha: 0.24 }, true),
            "& $icon": {
              color: !darkMode
                ? colors.createBlackColor({ alpha: 0.32 }, true)
                : colors.createWhiteColor({ alpha: 0.24 }, true)
            }
          }
        }
      },
      filledUnselected: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.04 })
          : colors.createWhiteColor({ alpha: 0.04 }),
        color: colors.text.secondary,
        "& $icon": { color: colors.text.secondary },
        "&:hover": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.12 })
            : colors.createWhiteColor({ alpha: 0.12 }),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.16 })
            : colors.createWhiteColor({ alpha: 0.16 })
        }
      },
      outlinedUnselected: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.04 })
          : colors.createWhiteColor({ alpha: 0.04 }),
        border: `1px solid ${
          !darkMode
            ? colors.createBlackColor({ alpha: 0.24 }, true)
            : colors.createWhiteColor({ alpha: 0.24 }, true)
        }`,
        color: colors.text.secondary,
        "& $icon": { color: colors.text.secondary },
        "&:hover": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.08 })
            : colors.createWhiteColor({ alpha: 0.08 }),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.12 })
            : colors.createWhiteColor({ alpha: 0.12 })
        },
        "&$disabled": {
          borderColor: colors.divider,
          color: colors.text.disabled,
          "& $icon": { color: colors.text.disabled }
        }
      },
      filledDefaultSelected: {
        backgroundColor: filledDefault.background.main,
        color: filledDefault.text,
        "& $icon": { color: filledDefault.text },
        "&:hover": {
          backgroundColor: filledDefault.background.hover,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        },
        "&:active": { backgroundColor: filledDefault.background.active },
        "&$disabled": {
          color: !darkMode
            ? colors.createBlackColor({ alpha: 0.32 }, true)
            : colors.createWhiteColor({ alpha: 0.32 }, true),
          "& $icon": {
            color: !darkMode
              ? colors.createBlackColor({ alpha: 0.32 }, true)
              : colors.createWhiteColor({ alpha: 0.32 }, true)
          },
          backgroundColor: filledDefault.background.disabled
        }
      },
      filledPrimarySelected: {
        backgroundColor: filledPrimarySelected.background.main,
        color: filledPrimarySelected.text,
        "& $icon": { color: filledPrimarySelected.text },
        "&:hover": {
          backgroundColor: filledPrimarySelected.background.hover,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        },
        "&:active": {
          backgroundColor: filledPrimarySelected.background.active
        },
        "&$disabled": {
          backgroundColor: filledPrimarySelected.background.disabled
        }
      },
      filledSecondarySelected: {
        backgroundColor: filledSecondarySelected.background.main,
        color: filledSecondarySelected.text,
        "& $icon": { color: filledSecondarySelected.text },
        "&:hover": {
          backgroundColor: filledSecondarySelected.background.hover,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        },
        "&:active": {
          backgroundColor: filledSecondarySelected.background.active
        },
        "&$disabled": {
          backgroundColor: filledSecondarySelected.background.disabled
        }
      },
      outlinedDefaultSelected: {
        backgroundColor: !darkMode
          ? colors.createBlackColor({ alpha: 0.12 }, true)
          : colors.createWhiteColor({ alpha: 0.12 }, true),
        border: `1px solid ${
          !darkMode
            ? colors.createBlackColor({ alpha: 0.48 }, true)
            : colors.createWhiteColor({ alpha: 0.48 }, true)
        }`,
        color: colors.text.secondary,
        "& $icon": { color: colors.text.secondary },
        "&:hover": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.16 }, true)
            : colors.createWhiteColor({ alpha: 0.16 }, true),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: colors.transparent
          }
        },
        "&:active": {
          backgroundColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.24 }, true)
            : colors.createWhiteColor({ alpha: 0.24 }, true)
        },
        "&$disabled": {
          backgroundColor: !darkMode ? grey[50] : grey[900],
          color: !darkMode
            ? colors.createBlackColor({ alpha: 0.32 }, true)
            : colors.createWhiteColor({ alpha: 0.32 }, true),
          "& $icon": {
            color: !darkMode
              ? colors.createBlackColor({ alpha: 0.32 }, true)
              : colors.createWhiteColor({ alpha: 0.32 }, true)
          },
          borderColor: !darkMode
            ? colors.createBlackColor({ alpha: 0.12 }, true)
            : colors.createWhiteColor({ alpha: 0.12 }, true)
        }
      },
      outlinedPrimarySelected: {
        backgroundColor: colors.createPrimaryColor({ alpha: 0.08 }, true),
        border: `1px solid ${filledPrimarySelectedMainBg}`,
        color: filledPrimarySelectedMainBg,
        "& $icon": { color: filledPrimarySelectedMainBg },
        "&:hover": {
          backgroundColor: colors.createPrimaryColor({ alpha: 0.12 }, true),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        },
        "&:active": {
          backgroundColor: colors.createPrimaryColor({ alpha: 0.24 }, true)
        },
        "&$disabled": {
          backgroundColor: colors.createPrimaryColor({ alpha: 0.12 }, true),
          borderColor: colors.createPrimaryColor({ alpha: 0.12 }, true)
        }
      },
      outlinedSecondarySelected: {
        backgroundColor: colors.createSecondaryColor({ alpha: 0.08 }, true),
        border: `1px solid ${filledSecondarySelectedMainBg}`,
        color: filledSecondarySelectedMainBg,
        "& $icon": { color: filledSecondarySelectedMainBg },
        "&:hover": {
          backgroundColor: colors.createSecondaryColor({ alpha: 0.12 }, true),
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": { backgroundColor: colors.transparent }
        },
        "&:active": {
          backgroundColor: colors.createSecondaryColor({ alpha: 0.24 }, true)
        },
        "&$disabled": {
          backgroundColor: colors.createSecondaryColor({ alpha: 0.12 }, true),
          borderColor: colors.createSecondaryColor({ alpha: 0.12 }, true)
        }
      },
      focusVisible: {
        outline: `2px solid ${darkMode ? blue[500] : blue[600]}`,
        outlineOffset: 1
      }
    };
  },
  { name: "SonnatChoiceChip" }
);

export default useStyles;
