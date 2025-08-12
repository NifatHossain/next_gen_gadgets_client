// Small wrapper hooks to keep usage consistent across the app and make TS migration easier later.
import { useDispatch, useSelector } from "react-redux";

/**
 * Usage:
 * const dispatch = useAppDispatch();
 * const user = useAppSelector(state => state.user);
 *
 * We purposely return functions rather than binding to a store instance,
 * so Next.js hydration and SSR mismatches are less likely.
 */

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
