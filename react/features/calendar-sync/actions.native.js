// @flow
import { generateRoomWithoutSeparator } from 'js-utils/random';

import { getDefaultURL } from '../app';
import { openDialog } from '../base/dialog';

import { refreshCalendar } from './actions';
import { addLinkToCalendarEntry } from './functions.native';

import {
    UpdateCalendarEventDialog
} from './components';

export * from './actions.any';

/**
 * Asks confirmation from the user to add a Jitsi link to the calendar event.
 *
 * @param {string} eventId - The event id.
 * @returns {{
 *     type: OPEN_DIALOG,
 *     component: React.Component,
 *     componentProps: (Object | undefined)
 * }}
 */
export function openUpdateCalendarEventDialog(eventId: string) {
    return openDialog(UpdateCalendarEventDialog, { eventId });
}

/**
 * Updates calendar event by generating new invite URL and editing the event
 * adding some descriptive text and location.
 *
 * @param {string} eventId - The event id.
 * @returns {Function}
 */
export function updateCalendarEvent(eventId: string) {
    return (dispatch: Dispatch<*>, getState: Function) => {
        const defaultUrl = getDefaultURL(getState);
        const roomName = generateRoomWithoutSeparator();

        addLinkToCalendarEntry(getState(), eventId, `${defaultUrl}/${roomName}`)
        .finally(() => {
            dispatch(refreshCalendar(false, false));
        });
    };
}
