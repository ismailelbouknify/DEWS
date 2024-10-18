import { Injectable } from '@angular/core';
import { NodeStatusEnum } from '../models/enums/nodeStatus';

@Injectable({
  providedIn: 'root'
})
export class StatusIconService {

  constructor() { }

  getIcon(status: NodeStatusEnum) {
    const statusIcons = {
      [NodeStatusEnum.CREATED]: "heroicons_solid:plus-circle",
      [NodeStatusEnum.ACTIVE]: "heroicons_solid:check-circle",
      [NodeStatusEnum.CANCELED]: "heroicons_solid:x-circle",
      [NodeStatusEnum.DELETED]: "heroicons_solid:minus-circle",
      [NodeStatusEnum.ERROR]: "heroicons_solid:exclamation-circle",
      [NodeStatusEnum.INACTIVE]: "heroicons_solid:question-mark-circle",

    };
    return statusIcons[status];
  }

  getIconColor(status: NodeStatusEnum) {
    const statusIcons = {
      [NodeStatusEnum.CREATED]: "text-blue-500",
      [NodeStatusEnum.ACTIVE]: "text-green-500",
      [NodeStatusEnum.CANCELED]: "text-gray-500",
      [NodeStatusEnum.DELETED]: "text-red-500",
      [NodeStatusEnum.ERROR]: "text-pink-500",
      [NodeStatusEnum.INACTIVE]: "text-amber-500",
      
    };
    return statusIcons[status];
  }

  getIconColorBg(status: NodeStatusEnum) {
    const statusIcons = {
      [NodeStatusEnum.CREATED]: "bg-blue-50",
      [NodeStatusEnum.ACTIVE]: "bg-green-50",
      [NodeStatusEnum.CANCELED]: "bg-gray-50",
      [NodeStatusEnum.DELETED]: "bg-red-50",
      [NodeStatusEnum.ERROR]: "bg-pink-50",
      [NodeStatusEnum.INACTIVE]: "bg-amber-50",
      
    };
    return statusIcons[status];
  }
}
