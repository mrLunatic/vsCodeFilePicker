import { DisplayType } from './DisplayType';
import { PresentationConfig } from './PresentationConfig';
export type DisplayConfig = DisplayType | PresentationConfig & {
    description: PresentationConfig;
    detail: PresentationConfig;
};
