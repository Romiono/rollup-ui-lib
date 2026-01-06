import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type ComponentAttributes<TElement extends ElementType = 'div'> = {
    as?: TElement;
} & ComponentPropsWithoutRef<TElement>;
