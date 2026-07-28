/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A holiday row from the `holidays` table.
 */
export interface Holiday {
	id: number;
	name: string;
	/** ISO date string from the DATE column */
	startDate: string;
	location: string;
	note?: string | null;
}

/**
 * A holiday instance row ("Holiday Rate" in the UI) from `holiday_instance`.
 *
 * Database constraints:
 * - name is UNIQUE across all instances
 * - (holidayId, dayPatternId) pair is UNIQUE
 */
export interface HolidayInstance {
	id: number;
	name: string;
	holidayId: number;
	dayPatternId: number;
	note?: string | null;
}

/**
 * Create payload: no id — the server assigns it and returns the created
 * instance. Also used as the modal's local draft state type.
 */
export type CreateHolidayInstancePayload = Omit<HolidayInstance, 'id'>;
