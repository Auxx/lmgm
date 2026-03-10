import { IpcMainInvokeEvent } from 'electron';
import ElectronStore from 'electron-store';

const store = new ElectronStore();

export const prefGet = async <T>(_: IpcMainInvokeEvent, key: string): Promise<T | undefined> => store.get(key);

export const prefSet = async <T>(_: IpcMainInvokeEvent, key: string, value: T): Promise<void> => store.set(key, value);

export const prefHas = async (_: IpcMainInvokeEvent, key: string): Promise<boolean> => store.has(key);

export const prefDelete = async (_: IpcMainInvokeEvent, key: string): Promise<void> => store.delete(key);
