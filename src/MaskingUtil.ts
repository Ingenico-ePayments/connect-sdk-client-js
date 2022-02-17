///<amd-module name="connectsdk.MaskingUtil"/>

import MaskedString = require("./MaskedString");

function _fillBuffer(index: number, offset: number, buffer: string[], tempMask: string[], valuec: string[]): void {
  if (index + offset < valuec.length && index < tempMask.length) {
    if ((tempMask[index] === "9" && Number(valuec[index + offset]) > -1 && valuec[index + offset] !== " ") || tempMask[index] === "*") {
      buffer.push(valuec[index + offset]);
    } else {
      if (valuec[index + offset] === tempMask[index]) {
        buffer.push(valuec[index + offset]);
      } else if (tempMask[index] !== "9" && tempMask[index] !== "*") {
        buffer.push(tempMask[index]);
        offset--;
      } else {
        // offset++;
        valuec.splice(index + offset, 1);
        index--;
      }
    }
    _fillBuffer(index + 1, offset, buffer, tempMask, valuec);
  }
}

class MaskingUtil {
  applyMask(mask: string | undefined, newValue: string, oldValue?: string): MaskedString {
    const buffer: string[] = [];
    const valuec = newValue.split("");
    if (mask) {
      const maskc = mask.split("");
      const tempMask: string[] = [];
      for (const c of maskc) {
        // the char '{' and '}' should ALWAYS be ignored
        if (c === "{" || c === "}") {
          // ignore
        } else {
          tempMask.push(c);
        }
      }
      // tempmask now contains the replaceable chars and the non-replaceable masks at the correct index
      _fillBuffer(0, 0, buffer, tempMask, valuec);
    } else {
      // send back as is
      for (const c of valuec) {
        buffer.push(c);
      }
    }
    newValue = buffer.join("");
    let cursor = 1;
    // calculate the cursor index
    if (oldValue) {
      const tester = oldValue.split("");
      for (let i = 0, il = buffer.length; i < il; i++) {
        if (buffer[i] !== tester[i]) {
          cursor = i + 1;
          break;
        }
      }
    }
    if (newValue.substring(0, newValue.length - 1) === oldValue) {
      cursor = newValue.length + 1;
    }
    return new MaskedString(newValue, cursor);
  }

  getMaxLengthBasedOnMask(mask?: string): number {
    if (mask) {
      const maskc = mask.split("");
      let newLength = -1;
      for (const c of maskc) {
        newLength++;
        if (c === "{" || c === "}") {
          newLength--;
        }
      }
      return newLength;
    }
    return -1;
  }

  removeMask(mask: string | undefined, value: string): string {
    // remove the mask from the masked input
    const buffer: string[] = [];
    const valuec = value ? value.split("") : [];
    if (mask) {
      const maskc = mask.split("");
      let valueIndex = -1;
      let inMask = false;
      for (const c of maskc) {
        valueIndex++;
        // the char '{' and '}' should ALWAYS be ignored
        if (c === "{" || c === "}") {
          valueIndex--;
          if (c === "{") {
            inMask = true;
          } else if (c === "}") {
            inMask = false;
          }
        } else {
          if (inMask && valuec[valueIndex]) {
            buffer.push(valuec[valueIndex]);
          }
        }
      }
    } else {
      // send back as is
      for (const c of valuec) {
        buffer.push(c);
      }
    }
    return buffer.join("").trim();
  }
}

export = MaskingUtil;
