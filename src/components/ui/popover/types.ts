export enum PopoverTriggerEnum {
  hover = "hover",
}

export enum PopoverPlacementEnum {
  top = "top",
  bottom = "bottom",
  right = "right",
  left = "left",
}

export type PopoverTrigger = keyof typeof PopoverTriggerEnum;

export type PopoverPlacement = keyof typeof PopoverPlacementEnum;
