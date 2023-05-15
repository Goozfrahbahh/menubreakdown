export interface LogMessage {
  message: string[];
  timestamp: Date;
}

export type Success = {
  id: string;
  message: string;
};

export type Info = {
  id: string;
  message: string;
  color: string;
};

export type Error = {
  id: string;
  message: string;
  color: string;
};
