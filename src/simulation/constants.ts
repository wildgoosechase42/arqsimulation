export const PLAYER_SPEED = 1.96;
export const FRICTION = 0.85;
export const INTERACTION_DISTANCE = 80;
export const ROOM_WIDTH = 1200;
export const ROOM_HEIGHT = 800;
export const CONSOLE_POS = { x: ROOM_WIDTH / 2, y: 120 };
export const VENT_POS = { x: ROOM_WIDTH / 2, y: ROOM_HEIGHT / 2 };
export const SITE_LANDING_URL = '/home';

export interface Boundary {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const WALL_BOUNDARIES: Boundary[] = [
  { x: 0, y: 0, w: ROOM_WIDTH, h: 40 },
  { x: 0, y: ROOM_HEIGHT - 40, w: ROOM_WIDTH, h: 40 },
  { x: 0, y: 0, w: 40, h: ROOM_HEIGHT },
  { x: ROOM_WIDTH - 40, y: 0, w: 40, h: ROOM_HEIGHT },
  { x: 200, y: 200, w: 60, h: 140 },
  { x: 200, y: 460, w: 60, h: 140 },
  { x: ROOM_WIDTH - 260, y: 200, w: 60, h: 140 },
  { x: ROOM_WIDTH - 260, y: 460, w: 60, h: 140 },
  { x: ROOM_WIDTH / 2 - 150, y: 0, w: 40, h: 180 },
  { x: ROOM_WIDTH / 2 + 110, y: 0, w: 40, h: 180 },
];
