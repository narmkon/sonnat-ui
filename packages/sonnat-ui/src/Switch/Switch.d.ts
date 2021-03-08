import * as React from "react";

type BaseProps<P = {}> = P & {
  /**
   * Append to the classNames applied to the component so you can override or
   * extend the styles.
   */
  className?: string;
  /**
   * If `label` text provided, a `<label>` will be rendered next to the switch.
   */
  label?: string;
  /** The name of the switch. */
  name?: string;
  /**
   * The value of the switch. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: string;
  /**
   * The size of the switch.
   * @default "medium"
   */
  size?: "small" | "medium";
  /**
   * If `true`, the switch will be readOnly.
   * @default false
   */
  readOnly?: boolean;
  /**
   * If `true`, the switch will be checked.
   * @default false
   */
  checked?: boolean;
  /**
   * If `true`, the switch will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the switch will be required.
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the switch will indicate invalid input.
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
   * The Callback fires when the switch has received focus.
   *
   * @param {React.FocusEvent<HTMLInputElement>} event The event source of the callback.
   */
  // eslint-disable-next-line no-unused-vars
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * The Callback fires when the switch has lost focus.
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
export type SwitchProps<P = {}> = BaseProps<P> &
  Omit<React.ComponentPropsWithRef<"div">, keyof BaseProps<P>>;

// eslint-disable-next-line no-unused-vars
export default function Switch<P = {}>(props: SwitchProps<P>): JSX.Element;