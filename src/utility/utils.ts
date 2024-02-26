import { IFormData } from "../models";

export function formatCustomDate(item: IFormData) {
    return `${item.date?.split('/')[2]}-${item.date?.split('/')[1]}-${item.date?.split('/')[0]} ${item.hour}`
}