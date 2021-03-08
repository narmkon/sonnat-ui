import * as React from "react";

type BaseProps<P = {}> = P & {
  /**
   * Append to the classNames applied to the component so you can override or
   * extend the styles.
   */
  className?: string;
  /**
   * If `label` text provided, a `<label>` will be rendered next to the checkbox.
   */
  label?: string;
  /** The name of the checkbox. */
  name?: string;
  /**
   * The value of the checkbox. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: string;
  /**
   * If `true`, the checkbox will appear indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * @default false
   */
  indeterminated?: boolean;
  /**
   * If `true`, the checkbox will be readOnly.
   * @default false
   */
  readOnly?: boolean;
  /**
   * If `true`, the checkbox will be checked.
   * @default false
   */
  checked?: boolean;
  /**
   * If `true`, the checkbox will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the checkbox will be required.
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the checkbox will indicate invalid input.
   * @default false
   */
  hasError?: boolean;
  /**
   * The Callback fires when the state has changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {boolean} checkedState The new checked state.
   *
   * You can also pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: (
    /* eslint-disable no-unused-vars */
    event: React.ChangeEvent<HTMLInputElement>,
    checkedState: boolean
    /* eslint-enable no-unused-vars */
  ) => void;
  /**
   * The Callback fires when the checkbox has received focus.
   *
   * @param {React.FocusEvent<HTMLInputElement>} event The event source of the callback.
   */
  // eslint-disable-next-line no-unused-vars
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * The Callback fires when the checkbox has lost focus.
   *
   * @param {React.FocusEvent<HTMLInputElement>} event The event source of the callback.
   */
  // eslint-disable-next-line no-unused-vars
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** The properties applied to the `input` element. */
  inputProps?: {
    ref: React.Ref<HTMLInputElement>;
  } & React.HTMLAttributes<HTMLInputElement>;
  /** The properties applied to the `label` element. */
  labelProps?: {
    ref: React.Ref<HTMLLabelElement>;
  } & React.LabelHTMLAttributes<HTMLLabelElement>;
};
export type CheckboxProps<P = {}> = BaseProps<P> &
  Omit<React.ComponentPropsWithRef<"div">, keyof BaseProps<P>>;

export interface CheckboxFC<P = {}> {
  // eslint-disable-next-line no-unused-vars
  (props: CheckboxProps<P>): JSX.Element;
}

declare const Checkbox: CheckboxFC<{}>;

export default Checkbox;