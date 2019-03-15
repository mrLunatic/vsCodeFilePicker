import { PresentationConfig } from './PresentationConfig';
import { DisplayConfig } from './DisplayConfig';
export interface Args {
    masks: string | string[];
    display: DisplayConfig;
    output: PresentationConfig;
}
