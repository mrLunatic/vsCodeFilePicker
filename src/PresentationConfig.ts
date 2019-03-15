import { DisplayType } from './DisplayType';
export type PresentationConfig = DisplayType | {
    type: DisplayType;
    json?: string;
};
