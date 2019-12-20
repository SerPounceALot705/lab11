import { serverUrl } from './index';

export const getCard = getsCardsOptions(serverUrl, 'cards', 'GET');
export const me = getsCardsOptions(serverUrl, 'users/me', 'GET');
export const mePatch = getsCardsOptions(serverUrl, 'users/me', 'PATCH');
export const createNewCart = getsCardsOptions(serverUrl, 'cards', 'POST');

export function getsCardsOptions(serverUrl, action, method) {
    return {
        serverUrl: serverUrl,
        token: '16684547-ae20-4b26-8a6e-8ab3e5ee968a',
        contentType: 'application/json',
        action: action,
        method: method
    }
}