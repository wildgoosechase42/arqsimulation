export type ARQState = 
  | 'READY' 
  | 'IN_FLIGHT_TO_RECEIVER' 
  | 'PROCESSING_RECEIVER' 
  | 'IN_FLIGHT_TO_SENDER' 
  | 'VERIFYING' 
  | 'TIMEOUT'
  | 'COMPLETE';

export interface Packet {
  sn: number;
  data: string[];
  displayData: string[];
  corrupted: boolean;
}

export interface ChecksumData {
  original: string[];
  received: string[];
}
