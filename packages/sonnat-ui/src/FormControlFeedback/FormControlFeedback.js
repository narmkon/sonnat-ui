import React from "react";
import PropTypes from "prop-types";
import createClass from "classnames";
import makeStyles from "../styles/makeStyles";
import useFormControl from "../FormControl/useFormControl";

const componentName = "FormControlFeedback";

const useStyles = makeStyles(
  theme => ({
    root: {
      direction: theme.direction,
      fontFamily: theme.typography.fontFamily[theme.direction],
      margin: 0,
      ...theme.typography.useText({
        fontSize: theme.typography.pxToRem(12),
        lineHeight: 1.6666666667,
        color: theme.colors.text.secondary
      })
    },
    errored: {
      color: !theme.darkMode
        ? theme.colors.error.origin
        : theme.colors.error.light
    }
  }),
  { name: `Sonnat${componentName}` }
);

const FormControlFeedback = function FormControlFeedback(props) {
  const { children, className, hasError, ...otherProps } = props;

  const localClass = useStyles();
  const formControl = useFormControl();

  const controlProps = {
    hasError: formControl ? formControl.hasError : hasError
  };

  return (
    <div
      className={createClass(localClass.root, className, {
        [localClass.errored]: controlProps.hasError
      })}
      {...otherProps}
    >
      {children}
    </div>
  );
};

FormControlFeedback.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasError: PropTypes.bool
};

FormControlFeedback.displayName = componentName;

export default FormControlFeedback;
