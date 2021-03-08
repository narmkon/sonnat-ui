import * as React from "react";

type BaseProps<P = {}> = P & {
  /** The label of the Tab. */
  label?: string;
  /**
   * Append to the classNames applied to the component so you can override or
   * extend the styles.
   */
  className?: string;
  /**
   * The icon placed before the label.
   * The component will use it as a `sonnat-icon` identifier.
   */
  icon?: string;
  /**
   * A unique identifier for the Tab.
   * If not provided the index of the Tab will be considered as the identifier.
   */
  identifier?: number | string;
  /**
   * If `true`, the Tab will be active (selected).
   * @default false
   */
  active?: boolean;
  /**
   * The Callback fires when the Tab has been clicked.
   *
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event The event source of the callback.
   * @param {number | string} identifier The identifier of the Tab.
   */
  onClick?: (
    /* eslint-disable no-unused-vars */
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    identifier: number | string
    /* eslint-enable no-unused-vars */
  ) => void;
};

export type TabProps<P> = BaseProps<P> &
  Omit<React.ComponentPropsWithRef<"div">, keyof BaseProps<P>>;

export interface TabFC<P> {
  // eslint-disable-next-line no-unused-vars
  (props: TabProps<P>): JSX.Element;
}

declare const Tab: TabFC<{}>;

export default Tab;