import { Buffer } from 'buffer';
import { nextTick } from 'process';

(window as any).global = window;
global.Buffer = Buffer;
global.process = {
	env: { DEBUG: undefined },
	version: '',
	nextTick,
} as any;
