/**
 * Cooksmart
 * Recipe management platform, realised as a pre-project for our SWT EnPro
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Ingredient } from './ingredient';


export interface Recipe { 
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
    ingredients: Array<Ingredient>;
}

