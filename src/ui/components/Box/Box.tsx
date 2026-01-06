import { forwardRef } from 'react';

import type { ComponentAttributes } from '../../domain';
import type { BoxProps } from './Box.contract';
import styles from './Box.module.css';

export const Box = forwardRef<HTMLDivElement, ComponentAttributes & BoxProps>(
    (props, ref) => {
        const { as, children, ...others } = props;
        const Component = as || 'div';
        return (
            <Component className={styles.root} ref={ref} {...others}>
                {children}
            </Component>
        );
    }
);

Box.displayName = 'Box';
export default Box;
