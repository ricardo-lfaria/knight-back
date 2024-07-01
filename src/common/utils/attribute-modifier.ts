export function attributeModifier(attribute: number): number {
  if (attribute >= 0 && attribute <= 8) {
    return -2;
  } else if (attribute >= 9 && attribute <= 10) {
    return -1;
  } else if (attribute >= 11 && attribute <= 12) {
    return 0;
  } else if (attribute >= 13 && attribute <= 15) {
    return 1;
  } else if (attribute >= 16 && attribute <= 18) {
    return 2;
  } else if (attribute >= 19 && attribute <= 20) {
    return 3;
  }
}
