/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createSelector } from '@reduxjs/toolkit';
import { Holiday } from '../../types/redux/holidays';
import { baseApi } from './baseApi';

/*
 * Read-only endpoint for the `holidays` table. The holiday instance page only
 * reads holidays; mutation endpoints belong with the holidays page and can be
 * injected here when that page is wired up.
 */
export const holidaysApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getHolidays: builder.query<Holiday[], void>({
			query: () => 'api/holidays',
			providesTags: result =>
				result
					? [...result.map(({ id }) => ({ type: 'Holidays' as const, id })), { type: 'Holidays', id: 'LIST' }]
					: [{ type: 'Holidays', id: 'LIST' }]
		})
	})
});

export const selectHolidaysQueryState = holidaysApi.endpoints.getHolidays.select();
export const selectAllHolidays = createSelector(
	selectHolidaysQueryState,
	({ data: holidays = [] }) => holidays
);

export const stableEmptyHolidays: Holiday[] = [];

export const {
	useGetHolidaysQuery
} = holidaysApi;
