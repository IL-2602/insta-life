import { RootState } from '@/app/store/types/rootState'
import { authActions } from '@/services/authService/store/slice/authEndpoints.slice'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { Context, HYDRATE } from 'next-redux-wrapper'
import { Action } from 'redux'
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

const isNotServer = typeof window !== 'undefined'

export const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { extra }) => {
    if (isNotServer) {
      const accessTokenFront = getCookie('accessToken')

      if (accessTokenFront) {
        headers.set('Authorization', `Bearer ${accessTokenFront}`)
      }
    } else {
      const context = extra as Context | undefined

      const isContextReqExist = context && 'req' in context

      if (isContextReqExist && context.req && 'cookies' in context.req) {
        const token = context.req.cookies.accessToken

        token && headers.set('Authorization', `Bearer ${token}`)
      }
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    //send refresh token to get new access token
    const refreshResult = await baseQuery(
      { method: 'POST', url: 'auth/update-tokens' },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // store the new token
      setCookie('accessToken', (refreshResult.data as { accessToken: string }).accessToken, {
        maxAge: 30 * 60,
        sameSite: 'none',
        secure: true,
      })
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(authActions.reset())
      deleteCookie('accessToken')
    }
  }

  return result
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'api',
  tagTypes: [
    'Me',
    'Profile',
    'Post',
    'UserPosts',
    'Payment',
    'Sessions',
    'LastMessages',
    'Dialogs',
    'Notification',
    'Follow',
    'Comments',
  ],
})

export const { getRunningQueriesThunk } = api.util
