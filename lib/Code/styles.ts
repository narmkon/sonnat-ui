import makeStyles from "../styles/makeStyles";

const useStyles = makeStyles(
  theme => {
    const {
      colors,
      darkMode,
      direction,
      spacings: { spaces },
      swatches: { grey },
      typography: { pxToRem, fontWeight, setText, fontFamily }
    } = theme;

    return {
      root: {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ...setText({
          fontSize: "0.875em",
          fontWeight: fontWeight.regular,
          lineHeight: 1.5714285714,
          color: colors.text.primary
        }),
        direction,
        fontFamily: fontFamily.monospace,
        borderRadius: pxToRem(2),
        backgroundColor: !darkMode ? grey[50] : grey[900],
        display: "inline-block",
        padding: `0 ${spaces[1].rem}`
      },
      codeBlock: {
        overflow: "auto",
        display: "block",
        textAlign: "left",
        direction: "ltr",
        fontSize: "0.875em",
        padding: spaces[7].rem,
        backgroundColor: colors.transparent,
        border: `1px solid ${colors.divider}`,
        borderRadius: pxToRem(4)
      }
    };
  },
  { name: "SonnatCode" }
);

export default useStyles;
