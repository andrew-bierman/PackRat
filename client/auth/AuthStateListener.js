import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle, signOut } from '../store/authStore';

/**
 * AuthStateListener function.
 *
 * @return {null} null
 */
export function AuthStateListener() {
  const dispatch = useDispatch();

  const store = useSelector((state) => state.auth);

  return null;
}
