import { useCallback } from 'react';

type RefItem<T> =
	| React.RefCallback<T | null>
	| React.MutableRefObject<T | null>
	| null
	| undefined;

export const useCombinedRefs = <T>(...refs: RefItem<T>[]) => {
	const refCb = useCallback((element: T | null) => {
		refs.forEach((ref) => {
			if (!ref) {
				return;
			}

			if (typeof ref === 'function') {
				ref(element);
			} else {
				ref.current = element;
			}
		});
	}, refs);

	return refCb;
};
