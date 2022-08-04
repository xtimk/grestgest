import { ReactFragment } from "react";
import { JsxFragment } from "typescript";

export interface WizardStep {
    steptitle: string;
    isOptional: boolean;
    content?: any;
}