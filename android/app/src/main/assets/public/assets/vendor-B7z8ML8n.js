import { R as React } from "./vendor-react--N-K1Ubq.js";
const instanceOfAny = (object, constructors) => constructors.some((c2) => object instanceof c2);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const cursorRequestMap = /* @__PURE__ */ new WeakMap();
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
const writeMethods = ["put", "add", "delete", "clear"];
const cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
function r$2(e2) {
  var t2, f2, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2) n2 += e2;
  else if ("object" == typeof e2) if (Array.isArray(e2)) {
    var o2 = e2.length;
    for (t2 = 0; t2 < o2; t2++) e2[t2] && (f2 = r$2(e2[t2])) && (n2 && (n2 += " "), n2 += f2);
  } else for (f2 in e2) e2[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e2, t2, f2 = 0, n2 = "", o2 = arguments.length; f2 < o2; f2++) (e2 = arguments[f2]) && (t2 = r$2(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
const concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i2 = 0; i2 < array1.length; i2++) {
    combinedArray[i2] = array1[i2];
  }
  for (let i2 = 0; i2 < array2.length; i2++) {
    combinedArray[array1.length + i2] = array2[i2];
  }
  return combinedArray;
};
const createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
const createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
const CLASS_PART_SEPARATOR = "-";
const EMPTY_CONFLICTS = [];
const ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
const createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i2 = 0; i2 < validatorsLength; i2++) {
    const validatorObj = validators[i2];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
const getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
const createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
const processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i2 = 0; i2 < len; i2++) {
    const classDefinition = classGroup[i2];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i2 = 0; i2 < len; i2++) {
    const [key, value] = entries[i2];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
const getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i2 = 0; i2 < len; i2++) {
    const part = parts[i2];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
const isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
const createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = "!";
const MODIFIER_SEPARATOR = ":";
const EMPTY_MODIFIERS = [];
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
const createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
const createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i2 = 0; i2 < modifiers.length; i2++) {
      const modifier = modifiers[i2];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
const createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i2 = 0; i2 < conflictGroups.length; ++i2) {
      const group = conflictGroups[i2];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
const twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k2 = 0; k2 < mix.length; k2++) {
    if (mix[k2]) {
      if (resolvedValue = toValue(mix[k2])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value) => fractionRegex.test(value);
const isNumber = (value) => !!value && !Number.isNaN(Number(value));
const isInteger = (value) => !!value && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
const isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
const isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
const isLabelPosition = (label) => label === "position" || label === "percentage";
const isLabelImage = (label) => label === "image" || label === "url";
const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
const isLabelLength = (label) => label === "length";
const isLabelNumber = (label) => label === "number";
const isLabelFamilyName = (label) => label === "family-name";
const isLabelWeight = (label) => label === "number" || label === "weight";
const isLabelShadow = (label) => label === "shadow";
const getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
const e$1 = [`pointerdown`, `mousedown`, `pointerup`, `mouseup`, `click`], t$1 = /* @__PURE__ */ new WeakMap();
function n$1(n2, i2, a2) {
  r$1(n2);
  let o2 = (e2) => {
    let t2 = e2.target;
    n2.contains(t2) && ((!a2 || a2(t2)) && (e2.preventDefault(), e2.stopPropagation(), e2.stopImmediatePropagation()), e2.type === `click` && (i2 == null ? void 0 : i2(e2)));
  };
  for (let t2 of e$1) document.addEventListener(t2, o2, true);
  t$1.set(n2, o2);
}
function r$1(n2) {
  let r2 = t$1.get(n2);
  if (r2) {
    for (let t2 of e$1) document.removeEventListener(t2, r2, true);
    t$1.delete(n2);
  }
}
function i$1(e2, t2) {
  let n2 = e2.wrapper.getBoundingClientRect();
  return { width: n2.width + t2, height: n2.height + t2, realWidth: n2.width, realHeight: n2.height };
}
function a$1(e2, t2) {
  let { elementDimensions: n2, popoverDimensions: r2, popoverPadding: i2, popoverArrowDimensions: a2 } = t2;
  return e2 === `start` ? Math.max(Math.min(n2.top - i2, window.innerHeight - r2.realHeight - a2.width), a2.width) : e2 === `end` ? Math.max(Math.min(n2.top - (r2 == null ? void 0 : r2.realHeight) + n2.height + i2, window.innerHeight - (r2 == null ? void 0 : r2.realHeight) - a2.width), a2.width) : e2 === `center` ? Math.max(Math.min(n2.top + n2.height / 2 - (r2 == null ? void 0 : r2.realHeight) / 2, window.innerHeight - (r2 == null ? void 0 : r2.realHeight) - a2.width), a2.width) : 0;
}
function o$1(e2, t2) {
  let { elementDimensions: n2, popoverDimensions: r2, popoverPadding: i2, popoverArrowDimensions: a2 } = t2;
  return e2 === `start` ? Math.max(Math.min(n2.left - i2, window.innerWidth - r2.realWidth - a2.width), a2.width) : e2 === `end` ? Math.max(Math.min(n2.left - (r2 == null ? void 0 : r2.realWidth) + n2.width + i2, window.innerWidth - (r2 == null ? void 0 : r2.realWidth) - a2.width), a2.width) : e2 === `center` ? Math.max(Math.min(n2.left + n2.width / 2 - (r2 == null ? void 0 : r2.realWidth) / 2, window.innerWidth - (r2 == null ? void 0 : r2.realWidth) - a2.width), a2.width) : 0;
}
function s$1(e2, t2, n2) {
  let { align: r2, side: s2 } = n2, c2 = n2.centered ? `over` : s2, l2 = n2.padding, u2 = i$1(e2, n2.offset), f2 = e2.arrow.getBoundingClientRect(), p2 = t2.getBoundingClientRect(), m2 = p2.top - u2.height, h2 = m2 >= 0, g2 = window.innerHeight - (p2.bottom + u2.height), _2 = g2 >= 0, v2 = p2.left - u2.width, y2 = v2 >= 0, b2 = window.innerWidth - (p2.right + u2.width), x2 = b2 >= 0, S2 = !h2 && !_2 && !y2 && !x2, C2 = c2;
  if (c2 === `top` && h2 ? x2 = y2 = _2 = false : c2 === `bottom` && _2 ? x2 = y2 = h2 = false : c2 === `left` && y2 ? x2 = h2 = _2 = false : c2 === `right` && x2 && (y2 = h2 = _2 = false), c2 === `over`) {
    let t3 = window.innerWidth / 2 - u2.realWidth / 2, n3 = window.innerHeight / 2 - u2.realHeight / 2;
    e2.wrapper.style.left = `${t3}px`, e2.wrapper.style.right = `auto`, e2.wrapper.style.top = `${n3}px`, e2.wrapper.style.bottom = `auto`;
  } else if (S2) {
    let t3 = window.innerWidth / 2 - (u2 == null ? void 0 : u2.realWidth) / 2;
    e2.wrapper.style.left = `${t3}px`, e2.wrapper.style.right = `auto`, e2.wrapper.style.bottom = `10px`, e2.wrapper.style.top = `auto`;
  } else if (y2) {
    let t3 = Math.min(v2, window.innerWidth - (u2 == null ? void 0 : u2.realWidth) - f2.width), n3 = a$1(r2, { elementDimensions: p2, popoverDimensions: u2, popoverPadding: l2, popoverArrowDimensions: f2 });
    e2.wrapper.style.left = `${t3}px`, e2.wrapper.style.top = `${n3}px`, e2.wrapper.style.bottom = `auto`, e2.wrapper.style.right = `auto`, C2 = `left`;
  } else if (x2) {
    let t3 = Math.min(b2, window.innerWidth - (u2 == null ? void 0 : u2.realWidth) - f2.width), n3 = a$1(r2, { elementDimensions: p2, popoverDimensions: u2, popoverPadding: l2, popoverArrowDimensions: f2 });
    e2.wrapper.style.right = `${t3}px`, e2.wrapper.style.top = `${n3}px`, e2.wrapper.style.bottom = `auto`, e2.wrapper.style.left = `auto`, C2 = `right`;
  } else if (h2) {
    let t3 = Math.min(m2, window.innerHeight - u2.realHeight - f2.width), n3 = o$1(r2, { elementDimensions: p2, popoverDimensions: u2, popoverPadding: l2, popoverArrowDimensions: f2 });
    e2.wrapper.style.top = `${t3}px`, e2.wrapper.style.left = `${n3}px`, e2.wrapper.style.bottom = `auto`, e2.wrapper.style.right = `auto`, C2 = `top`;
  } else if (_2) {
    let t3 = Math.min(g2, window.innerHeight - (u2 == null ? void 0 : u2.realHeight) - f2.width), n3 = o$1(r2, { elementDimensions: p2, popoverDimensions: u2, popoverPadding: l2, popoverArrowDimensions: f2 });
    e2.wrapper.style.left = `${n3}px`, e2.wrapper.style.bottom = `${t3}px`, e2.wrapper.style.top = `auto`, e2.wrapper.style.right = `auto`, C2 = `bottom`;
  }
  d(e2, S2 ? `over` : C2, r2, t2), [...e2.wrapper.classList].filter((e3) => e3.startsWith(`driver-popover-side-`) || e3.startsWith(`driver-popover-align-`)).forEach((t3) => e2.wrapper.classList.remove(t3)), e2.wrapper.classList.add(`driver-popover-side-${C2}`), e2.wrapper.classList.add(`driver-popover-align-${r2}`);
}
function c$1(e2, t2, n2, r2, i2, a2 = 10) {
  let o2 = r2 - n2;
  return e2 <= n2 && t2 >= r2 ? i2 === `start` ? 15 + a2 / 2 : i2 === `end` ? o2 - 15 - a2 / 2 : o2 / 2 : (Math.min(Math.max(e2, n2), r2) + Math.min(Math.max(t2, n2), r2)) / 2 - n2;
}
function l$1(e2, t2, n2 = 10) {
  let r2 = t2 - 15 - n2;
  if (r2 < 15) return Math.max(0, (t2 - n2) / 2);
  let i2 = e2 - n2 / 2;
  return Math.min(Math.max(i2, 15), r2);
}
function u$1(e2, t2, n2) {
  return e2 === `left` || e2 === `right` ? t2.bottom > n2.top && t2.top < n2.bottom ? e2 : t2.bottom <= n2.top ? `bottom` : `top` : t2.right > n2.left && t2.left < n2.right ? e2 : t2.right <= n2.left ? `right` : `left`;
}
function d(e2, t2, n2, r2) {
  let i2 = e2.arrow;
  if (i2.className = `driver-popover-arrow`, i2.style.top = ``, i2.style.right = ``, i2.style.bottom = ``, i2.style.left = ``, t2 === `over`) {
    i2.classList.add(`driver-popover-arrow-none`);
    return;
  }
  let a2 = r2.getBoundingClientRect(), o2 = e2.wrapper.getBoundingClientRect(), s2 = u$1(t2, a2, o2);
  i2.classList.add(`driver-popover-arrow-side-${s2}`);
  let d2 = i2.getBoundingClientRect().width || 10;
  if (s2 === `left` || s2 === `right`) {
    let e3 = c$1(a2.top, a2.bottom, o2.top, o2.bottom, n2, d2);
    i2.style.top = `${l$1(e3, o2.height, d2)}px`;
  } else {
    let e3 = c$1(a2.left, a2.right, o2.left, o2.right, n2, d2);
    i2.style.left = `${l$1(e3, o2.width, d2)}px`;
  }
}
function f$1(e2) {
  return typeof e2 == `function` ? e2() : typeof e2 == `string` ? document.querySelector(e2) : e2;
}
function p(e2) {
  let t2 = window.getComputedStyle(e2);
  return [t2.overflow, t2.overflowX, t2.overflowY].some((e3) => e3 === `auto` || e3 === `scroll`);
}
function m(e2, t2, n2, r2) {
  return (e2 /= r2 / 2) < 1 ? n2 / 2 * e2 * e2 + t2 : -n2 / 2 * (--e2 * (e2 - 2) - 1) + t2;
}
function h$1(e2) {
  let t2 = `a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])`;
  return e2.flatMap((e3) => {
    let n2 = e3.matches(t2), r2 = Array.from(e3.querySelectorAll(t2));
    return [...n2 ? [e3] : [], ...r2];
  }).filter((e3) => getComputedStyle(e3).pointerEvents !== `none` && y(e3));
}
function g(e2, t2) {
  if (!e2 || v$1(e2)) return;
  let n2 = e2.offsetHeight > window.innerHeight;
  e2.scrollIntoView({ behavior: !t2 || _$1(e2) ? `auto` : `smooth`, inline: `center`, block: n2 ? `start` : `center` });
}
function _$1(e2) {
  if (!e2 || !e2.parentElement) return;
  let t2 = e2.parentElement;
  return t2.scrollHeight > t2.clientHeight;
}
function v$1(e2) {
  let t2 = e2.getBoundingClientRect();
  return t2.top >= 0 && t2.left >= 0 && t2.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t2.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function y(e2) {
  return !!(e2.offsetWidth || e2.offsetHeight || e2.getClientRects().length);
}
function b(e2) {
  e2 && (e2.wrapper.style.display = `none`);
}
function x(e2, t2) {
  var _a;
  let r2 = C();
  document.body.appendChild(r2.wrapper);
  let { title: i2, description: a2, showButtons: o2, disableButtons: c2, showProgress: l2, nextBtnText: u2, prevBtnText: d2, progressText: f2 } = t2;
  r2.nextButton.innerHTML = u2, r2.previousButton.innerHTML = d2, r2.progress.innerHTML = f2, t2.doneButton && r2.nextButton.classList.add(`driver-popover-done-btn`), i2 ? (r2.title.innerHTML = i2, r2.title.style.display = `block`) : r2.title.style.display = `none`, a2 ? (r2.description.innerHTML = a2, r2.description.style.display = `block`) : r2.description.style.display = `none`;
  let p2 = o2.includes(`next`) || o2.includes(`previous`) || l2;
  r2.closeButton.style.display = o2.includes(`close`) ? `block` : `none`, p2 ? (r2.footer.style.display = `flex`, r2.progress.style.display = l2 ? `block` : `none`, r2.nextButton.style.display = o2.includes(`next`) ? `block` : `none`, r2.previousButton.style.display = o2.includes(`previous`) ? `block` : `none`) : r2.footer.style.display = `none`, c2.includes(`next`) && (r2.nextButton.disabled = true, r2.nextButton.classList.add(`driver-popover-btn-disabled`)), c2.includes(`previous`) && (r2.previousButton.disabled = true, r2.previousButton.classList.add(`driver-popover-btn-disabled`)), c2.includes(`close`) && (r2.closeButton.disabled = true, r2.closeButton.classList.add(`driver-popover-btn-disabled`));
  let m2 = r2.wrapper;
  m2.style.display = `block`, m2.style.left = ``, m2.style.top = ``, m2.style.bottom = ``, m2.style.right = ``, m2.id = `driver-popover-content`, m2.setAttribute(`role`, `dialog`), m2.setAttribute(`aria-labelledby`, `driver-popover-title`), m2.setAttribute(`aria-describedby`, `driver-popover-description`);
  let _2 = r2.arrow;
  _2.className = `driver-popover-arrow`, m2.className = `driver-popover ${t2.popoverClass || ``}`.trim(), n$1(r2.wrapper, (e3) => {
    var _a2, _b, _c;
    let n2 = e3.target;
    if (n2.closest(`.driver-popover-next-btn`)) return (_a2 = t2.onNextClick) == null ? void 0 : _a2.call(t2);
    if (n2.closest(`.driver-popover-prev-btn`)) return (_b = t2.onPrevClick) == null ? void 0 : _b.call(t2);
    if (n2.closest(`.driver-popover-close-btn`)) return (_c = t2.onCloseClick) == null ? void 0 : _c.call(t2);
  }, (e3) => r2.description.contains(e3) || r2.title.contains(e3) ? false : !!e3.closest(`.driver-popover-prev-btn, .driver-popover-next-btn, .driver-popover-close-btn`)), (_a = t2.onRender) == null ? void 0 : _a.call(t2, r2), s$1(r2, e2, t2.position), S(r2, e2, t2.position), g(m2, t2.smoothScroll);
  let v2 = h$1([m2, e2]);
  return v2.length > 0 && v2[0].focus(), r2;
}
function S(e2, t2, n2) {
  e2.wrapper.querySelectorAll(`img`).forEach((r2) => {
    if (r2.complete) return;
    let i2 = () => s$1(e2, t2, n2);
    r2.addEventListener(`load`, i2, { once: true }), r2.addEventListener(`error`, i2, { once: true });
  });
}
function C() {
  let e2 = document.createElement(`div`);
  e2.classList.add(`driver-popover`);
  let t2 = document.createElement(`div`);
  t2.classList.add(`driver-popover-arrow`);
  let n2 = document.createElement(`header`);
  n2.id = `driver-popover-title`, n2.classList.add(`driver-popover-title`), n2.style.display = `none`, n2.innerText = `Popover Title`;
  let r2 = document.createElement(`div`);
  r2.id = `driver-popover-description`, r2.classList.add(`driver-popover-description`), r2.style.display = `none`, r2.innerText = `Popover description is here`;
  let i2 = document.createElement(`button`);
  i2.type = `button`, i2.classList.add(`driver-popover-close-btn`), i2.setAttribute(`aria-label`, `Close`), i2.innerHTML = `&times;`;
  let a2 = document.createElement(`footer`);
  a2.classList.add(`driver-popover-footer`);
  let o2 = document.createElement(`span`);
  o2.classList.add(`driver-popover-progress-text`), o2.innerText = ``;
  let s2 = document.createElement(`span`);
  s2.classList.add(`driver-popover-navigation-btns`);
  let c2 = document.createElement(`button`);
  c2.type = `button`, c2.classList.add(`driver-popover-prev-btn`, `driver-popover-footer-btn`), c2.innerHTML = `Previous`;
  let l2 = document.createElement(`button`);
  return l2.type = `button`, l2.classList.add(`driver-popover-next-btn`, `driver-popover-footer-btn`), l2.innerHTML = `Next`, s2.appendChild(c2), s2.appendChild(l2), a2.appendChild(o2), a2.appendChild(s2), e2.appendChild(i2), e2.appendChild(t2), e2.appendChild(n2), e2.appendChild(r2), e2.appendChild(a2), { wrapper: e2, arrow: t2, title: n2, description: r2, footer: a2, previousButton: c2, nextButton: l2, closeButton: i2, footerButtons: s2, progress: o2 };
}
function w(e2) {
  var _a;
  e2 && (r$1(e2.wrapper), (_a = e2.wrapper.parentElement) == null ? void 0 : _a.removeChild(e2.wrapper));
}
function T(e2, t2) {
  let n2 = window.innerWidth, r2 = window.innerHeight, i2 = t2.padding, a2 = t2.radius, o2 = e2.width + i2 * 2, s2 = e2.height + i2 * 2, c2 = Math.min(a2, o2 / 2, s2 / 2), l2 = Math.floor(Math.max(c2, 0)), u2 = e2.x - i2 + l2, d2 = e2.y - i2, f2 = o2 - l2 * 2, p2 = s2 - l2 * 2;
  return `M${n2},0L0,0L0,${r2}L${n2},${r2}L${n2},0Z
    M${u2},${d2} h${f2} a${l2},${l2} 0 0 1 ${l2},${l2} v${p2} a${l2},${l2} 0 0 1 -${l2},${l2} h-${f2} a${l2},${l2} 0 0 1 -${l2},-${l2} v-${p2} a${l2},${l2} 0 0 1 ${l2},-${l2} z`;
}
function E(e2, t2, n2, r2, i2) {
  let a2 = e2.getState(`__activeStagePosition`), o2 = a2 || r2.getBoundingClientRect(), s2 = i2.getBoundingClientRect();
  a2 = { x: m(t2, o2.x, s2.x - o2.x, n2), y: m(t2, o2.y, s2.y - o2.y, n2), width: m(t2, o2.width, s2.width - o2.width, n2), height: m(t2, o2.height, s2.height - o2.height, n2) }, A(e2, a2), e2.setState(`__activeStagePosition`, a2);
}
function D(e2, t2) {
  if (!t2) return;
  let n2 = t2.getBoundingClientRect(), r2 = { x: n2.x, y: n2.y, width: n2.width, height: n2.height };
  e2.setState(`__activeStagePosition`, r2), A(e2, r2);
}
function O(e2) {
  let t2 = e2.getState(`__activeStagePosition`), n2 = e2.getState(`__overlaySvg`);
  if (!t2) return;
  if (!n2) {
    console.warn(`No stage svg found.`);
    return;
  }
  let r2 = window.innerWidth, i2 = window.innerHeight;
  n2.setAttribute(`viewBox`, `0 0 ${r2} ${i2}`);
}
function k(e2, t2) {
  let r2 = M(e2, t2);
  document.body.appendChild(r2), n$1(r2, (t3) => {
    t3.target.tagName === `path` && e2.emit(`overlayClick`);
  }), e2.setState(`__overlaySvg`, r2);
}
function A(e2, t2) {
  let n2 = e2.getState(`__overlaySvg`);
  if (!n2) {
    k(e2, t2);
    return;
  }
  let r2 = n2.firstElementChild;
  if ((r2 == null ? void 0 : r2.tagName) !== `path`) throw Error(`no path element found in stage svg`);
  r2.setAttribute(`d`, T(t2, j(e2)));
}
function j(e2) {
  return { padding: e2.getConfig(`stagePadding`) || 0, radius: e2.getConfig(`stageRadius`) || 0 };
}
function M(e2, t2) {
  let n2 = window.innerWidth, r2 = window.innerHeight, i2 = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
  i2.classList.add(`driver-overlay`, `driver-overlay-animated`), i2.setAttribute(`viewBox`, `0 0 ${n2} ${r2}`), i2.setAttribute(`xmlSpace`, `preserve`), i2.setAttribute(`xmlnsXlink`, `http://www.w3.org/1999/xlink`), i2.setAttribute(`version`, `1.1`), i2.setAttribute(`preserveAspectRatio`, `xMinYMin slice`), i2.style.fillRule = `evenodd`, i2.style.clipRule = `evenodd`, i2.style.strokeLinejoin = `round`, i2.style.strokeMiterlimit = `2`, i2.style.zIndex = `10000`, i2.style.position = `fixed`, i2.style.top = `0`, i2.style.left = `0`, i2.style.width = `100%`, i2.style.height = `100%`;
  let a2 = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
  return a2.setAttribute(`d`, T(t2, j(e2))), a2.style.fill = e2.getConfig(`overlayColor`) || `rgb(0,0,0)`, a2.style.opacity = `${e2.getConfig(`overlayOpacity`)}`, a2.style.pointerEvents = `auto`, a2.style.cursor = `auto`, i2.appendChild(a2), i2;
}
function N(e2) {
  let t2 = e2.getState(`__overlaySvg`);
  t2 && (r$1(t2), t2.remove());
}
const P = `{{current}} of {{total}}`;
function F(e2, t2) {
  return !(t2.skipMissingElement ?? e2.getConfig(`skipMissingElement`)) || !t2.element ? false : !f$1(t2.element);
}
function I(e2, t2, n2) {
  let r2 = e2.getConfig(`steps`) || [];
  for (let i2 = t2; i2 >= 0 && i2 < r2.length; i2 += n2) if (!F(e2, r2[i2])) return i2;
}
function L(e2, t2) {
  var _a, _b;
  let n2 = e2.getState(`activeIndex`), r2 = n2 !== void 0 && I(e2, n2 + 1, 1) === void 0, i2 = ((_a = t2 == null ? void 0 : t2.popover) == null ? void 0 : _a.onDoneClick) || e2.getConfig(`onDoneClick`);
  return r2 && i2 ? i2 : ((_b = t2 == null ? void 0 : t2.popover) == null ? void 0 : _b.onNextClick) || e2.getConfig(`onNextClick`);
}
function R(e2, t2) {
  var _a;
  return ((_a = t2 == null ? void 0 : t2.popover) == null ? void 0 : _a.onPrevClick) || e2.getConfig(`onPrevClick`);
}
function z(e2, t2) {
  var _a;
  return ((_a = t2 == null ? void 0 : t2.popover) == null ? void 0 : _a.onCloseClick) || e2.getConfig(`onCloseClick`);
}
function B(e2, t2, n2) {
  let r2 = e2.getConfig(`steps`) || [], i2 = r2[t2], a2 = i2.popover || {}, o2 = I(e2, t2 + 1, 1) !== void 0, s2 = I(e2, t2 - 1, -1) !== void 0, c2 = a2.doneBtnText || e2.getConfig(`doneBtnText`) || `Done`, l2 = e2.getConfig(`allowClose`), u2 = a2.showProgress === void 0 ? e2.getConfig(`showProgress`) : a2.showProgress, d2 = (a2.progressText || e2.getConfig(`progressText`) || P).replace(`{{current}}`, `${t2 + 1}`).replace(`{{total}}`, `${r2.length}`), f2 = a2.showButtons || e2.getConfig(`showButtons`), p2 = [`next`, `previous`, ...l2 ? [`close`] : []].filter((e3) => !(f2 == null ? void 0 : f2.length) || f2.includes(e3)), m2 = a2.onNextClick || e2.getConfig(`onNextClick`), h2 = a2.onPrevClick || e2.getConfig(`onPrevClick`), g2 = a2.onCloseClick || e2.getConfig(`onCloseClick`);
  return { ...i2, popover: { showButtons: p2, nextBtnText: o2 ? void 0 : c2, disableButtons: [...s2 ? [] : [`previous`]], showProgress: u2, onNextClick: m2 || n2.onNextClick, onPrevClick: h2 || n2.onPrevClick, onCloseClick: g2 || n2.onCloseClick, ...a2, progressText: d2 } };
}
function V(e2, t2, n2) {
  var _a, _b;
  let r2 = e2.getConfig(`stagePadding`) || 0;
  return { side: ((_a = n2.popover) == null ? void 0 : _a.side) || `bottom`, align: ((_b = n2.popover) == null ? void 0 : _b.align) || `start`, offset: r2 + (e2.getConfig(`popoverOffset`) || 0), padding: r2, centered: t2.id === `driver-dummy-element` };
}
function H(e2, t2, n2) {
  let r2 = n2.popover || {}, i2 = e2.getState(`activeIndex`), a2 = i2 !== void 0 && I(e2, i2 + 1, 1) === void 0;
  return { title: r2.title, description: r2.description, showButtons: r2.showButtons || e2.getConfig(`showButtons`), disableButtons: r2.disableButtons || e2.getConfig(`disableButtons`) || [], showProgress: r2.showProgress || e2.getConfig(`showProgress`) || false, progressText: r2.progressText ?? (e2.getConfig(`progressText`) || P), nextBtnText: r2.nextBtnText ?? (e2.getConfig(`nextBtnText`) || `Next`), prevBtnText: r2.prevBtnText ?? (e2.getConfig(`prevBtnText`) || `Previous`), doneButton: a2, popoverClass: r2.popoverClass || e2.getConfig(`popoverClass`) || ``, smoothScroll: e2.getConfig(`smoothScroll`), onNextClick: () => {
    let r3 = L(e2, n2);
    return r3 ? r3(t2, n2, e2.getHookOpts()) : e2.emit(`nextClick`);
  }, onPrevClick: () => {
    let r3 = R(e2, n2);
    return r3 ? r3(t2, n2, e2.getHookOpts()) : e2.emit(`prevClick`);
  }, onCloseClick: () => {
    let r3 = z(e2, n2);
    return r3 ? r3(t2, n2, e2.getHookOpts()) : e2.emit(`closeClick`);
  }, onRender: (t3) => {
    var _a;
    e2.setState(`popover`, t3), (_a = r2.onPopoverRender || e2.getConfig(`onPopoverRender`)) == null ? void 0 : _a(t3, e2.getHookOpts());
  }, position: V(e2, t2, n2) };
}
function U(e2, t2, n2) {
  w(e2.getState(`popover`)), x(t2, H(e2, t2, n2));
}
function W(e2, t2, n2) {
  let r2 = e2.getState(`popover`);
  r2 && s$1(r2, t2, V(e2, t2, n2));
}
function G() {
  let e2 = document.getElementById(`driver-dummy-element`);
  if (e2) return e2;
  let t2 = document.createElement(`div`);
  return t2.id = `driver-dummy-element`, t2.style.width = `0`, t2.style.height = `0`, t2.style.pointerEvents = `none`, t2.style.opacity = `0`, t2.style.position = `fixed`, t2.style.top = `50%`, t2.style.left = `50%`, document.body.appendChild(t2), t2;
}
function K(e2, t2) {
  let n2 = f$1(t2.element);
  n2 || (n2 = G()), J(e2, n2, t2);
}
function q(e2) {
  let t2 = e2.getState(`__activeElement`), n2 = e2.getState(`__activeStep`);
  t2 && (D(e2, t2), O(e2), W(e2, t2, n2));
}
function J(e2, t2, n2) {
  let r2 = e2.getConfig(`duration`) || 400, i2 = Date.now(), a2 = e2.getState(`__activeStep`), o2 = e2.getState(`__activeElement`) || t2, s2 = !o2 || o2 === t2, c2 = t2.id === `driver-dummy-element`, l2 = o2.id === `driver-dummy-element`, u2 = e2.getConfig(`animate`), d2 = n2.onHighlightStarted || e2.getConfig(`onHighlightStarted`), f2 = (n2 == null ? void 0 : n2.onHighlighted) || e2.getConfig(`onHighlighted`), m2 = (a2 == null ? void 0 : a2.onDeselected) || e2.getConfig(`onDeselected`), h2 = e2.getHookOpts();
  !s2 && m2 && m2(l2 ? void 0 : o2, a2, h2), d2 && d2(c2 ? void 0 : t2, n2, h2);
  let _2 = !s2 && u2, v2 = false;
  b(e2.getState(`popover`)), e2.setState(`previousStep`, a2), e2.setState(`previousElement`, o2), e2.setState(`activeStep`, n2), e2.setState(`activeElement`, t2);
  let y2 = () => {
    if (e2.getState(`__transitionCallback`) !== y2) return;
    let s3 = Date.now() - i2, l3 = r2 - s3 <= r2 / 2;
    n2.popover && l3 && !v2 && _2 && (U(e2, t2, n2), v2 = true), e2.getConfig(`animate`) && s3 < r2 ? E(e2, s3, r2, o2, t2) : (D(e2, t2), f2 && f2(c2 ? void 0 : t2, n2, e2.getHookOpts()), e2.setState(`__transitionCallback`, void 0), e2.setState(`__previousStep`, a2), e2.setState(`__previousElement`, o2), e2.setState(`__activeStep`, n2), e2.setState(`__activeElement`, t2)), window.requestAnimationFrame(y2);
  };
  e2.setState(`__transitionCallback`, y2), window.requestAnimationFrame(y2), g(t2, e2.getConfig(`smoothScroll`)), !_2 && n2.popover && U(e2, t2, n2), document.querySelectorAll(`.driver-active-element-parent`).forEach((e3) => {
    e3.classList.remove(`driver-active-element-parent`, `driver-active-element-parent-no-scroll`);
  }), o2.classList.remove(`driver-active-element`, `driver-no-interaction`), o2.removeAttribute(`aria-haspopup`), o2.removeAttribute(`aria-expanded`), o2.removeAttribute(`aria-controls`), (n2.disableActiveInteraction ?? e2.getConfig(`disableActiveInteraction`)) && t2.classList.add(`driver-no-interaction`);
  let x2 = t2.parentElement;
  x2 && x2 !== document.body && (x2.classList.add(`driver-active-element-parent`), p(x2) && x2.classList.add(`driver-active-element-parent-no-scroll`)), t2.classList.add(`driver-active-element`), t2.setAttribute(`aria-haspopup`, `dialog`), t2.setAttribute(`aria-expanded`, `true`), t2.setAttribute(`aria-controls`, `driver-popover-content`);
}
function Y() {
  var _a;
  (_a = document.getElementById(`driver-dummy-element`)) == null ? void 0 : _a.remove(), document.querySelectorAll(`.driver-active-element`).forEach((e2) => {
    let t2 = e2.parentElement;
    t2 && t2 !== document.body && t2.classList.remove(`driver-active-element-parent`, `driver-active-element-parent-no-scroll`), e2.classList.remove(`driver-active-element`, `driver-no-interaction`), e2.removeAttribute(`aria-haspopup`), e2.removeAttribute(`aria-expanded`), e2.removeAttribute(`aria-controls`);
  });
}
function X(e2) {
  let t2 = e2.getState(`__resizeTimeout`);
  t2 && window.cancelAnimationFrame(t2), e2.setState(`__resizeTimeout`, window.requestAnimationFrame(() => q(e2)));
}
function Z(e2, t2) {
  var _a, _b, _c;
  if (!e2.getState(`isInitialized`) || !(t2.key === `Tab` || t2.keyCode === 9)) return;
  let n2 = e2.getState(`__activeElement`), r2 = (_a = e2.getState(`popover`)) == null ? void 0 : _a.wrapper, i2 = h$1([...r2 ? [r2] : [], ...n2 ? [n2] : []]), a2 = i2[0], o2 = i2[i2.length - 1];
  t2.preventDefault(), t2.shiftKey ? (_b = i2[i2.indexOf(document.activeElement) - 1] || o2) == null ? void 0 : _b.focus() : (_c = i2[i2.indexOf(document.activeElement) + 1] || a2) == null ? void 0 : _c.focus();
}
function Q(e2, t2) {
  (e2.getConfig(`allowKeyboardControl`) ?? true) && (t2.key === `Escape` ? e2.emit(`escapePress`) : t2.key === `ArrowRight` ? e2.emit(`arrowRightPress`) : t2.key === `ArrowLeft` && e2.emit(`arrowLeftPress`));
}
function $(e2, t2) {
  let n2 = e2.getState(`__activeElement`), r2 = t2.target;
  !n2 || !r2 || !n2.contains(r2) || e2.emit(`activeElementClick`);
}
function ee(e2) {
  let t2 = (t3) => Q(e2, t3), n2 = (t3) => Z(e2, t3), r2 = () => X(e2), i2 = () => X(e2), a2 = (t3) => $(e2, t3);
  e2.setState(`__events`, { onKeyup: t2, onKeydown: n2, onResize: r2, onScroll: i2, onClick: a2 }), window.addEventListener(`keyup`, t2, false), window.addEventListener(`keydown`, n2, false), window.addEventListener(`resize`, r2), window.addEventListener(`scroll`, i2), document.addEventListener(`click`, a2, false);
}
function te(e2) {
  let t2 = e2.getState(`__events`);
  t2 && (window.removeEventListener(`keyup`, t2.onKeyup), window.removeEventListener(`keydown`, t2.onKeydown), window.removeEventListener(`resize`, t2.onResize), window.removeEventListener(`scroll`, t2.onScroll), document.removeEventListener(`click`, t2.onClick, false));
}
function ne() {
  let e2 = {};
  function t2(t3 = {}) {
    e2 = { animate: true, duration: 400, allowClose: true, allowScroll: true, overlayClickBehavior: `close`, overlayOpacity: 0.7, smoothScroll: false, disableActiveInteraction: false, advanceOnClick: false, skipMissingElement: false, waitForElement: 0, showProgress: false, stagePadding: 10, stageRadius: 5, popoverOffset: 10, showButtons: [`next`, `previous`, `close`], disableButtons: [], overlayColor: `#000`, ...t3 };
  }
  return t2(), { getConfig: ((t3) => t3 ? e2[t3] : e2), configure: t2 };
}
function re() {
  let e2 = {}, t2 = ((t3) => t3 ? e2[t3] : e2), n2 = (t3, n3) => {
    e2[t3] = n3;
  };
  function r2() {
    e2 = {};
  }
  return { getState: t2, setState: n2, resetState: r2 };
}
function ie() {
  let e2 = {};
  function t2(t3, n3) {
    e2[t3] = n3;
  }
  function n2(t3) {
    var _a;
    (_a = e2[t3]) == null ? void 0 : _a.call(e2);
  }
  function r2() {
    e2 = {};
  }
  return { listen: t2, emit: n2, reset: r2 };
}
function ae(e2 = {}) {
  let t2 = ne();
  t2.configure(e2);
  let n2 = re(), r2 = ie(), i2;
  return { getConfig: t2.getConfig, setConfig: t2.configure, getState: n2.getState, setState: n2.setState, resetState: n2.resetState, listen: r2.listen, emit: r2.emit, resetEmitter: r2.reset, getDriver: () => i2, setDriver: (e3) => {
    i2 = e3;
  }, getHookOpts: (e3) => {
    let r3 = e3 || n2.getState();
    return { config: t2.getConfig(), state: r3, driver: i2, index: r3.activeIndex };
  } };
}
function oe(e2 = {}) {
  let t2 = ae(e2);
  function n2() {
    t2.getConfig(`allowClose`) && h2();
  }
  function r2() {
    let e3 = t2.getConfig(`overlayClickBehavior`);
    if (t2.getConfig(`allowClose`) && e3 === `close`) {
      h2();
      return;
    }
    if (typeof e3 == `function`) {
      let n3 = t2.getState(`__activeStep`);
      e3(t2.getState(`__activeElement`), n3, t2.getHookOpts());
      return;
    }
    if (e3 === `nextStep`) {
      let e4 = t2.getState(`activeStep`), n3 = t2.getState(`activeElement`), r3 = L(t2, e4);
      if (r3) {
        r3(n3, e4, t2.getHookOpts());
        return;
      }
      i2();
    }
  }
  function i2() {
    let e3 = t2.getState(`activeIndex`), n3 = t2.getConfig(`steps`) || [];
    if (e3 === void 0) return;
    let r3 = e3 + 1;
    n3[r3] ? m2(r3) : h2();
  }
  function a2() {
    let e3 = t2.getState(`activeIndex`), n3 = t2.getConfig(`steps`) || [];
    if (e3 === void 0) return;
    let r3 = e3 - 1;
    n3[r3] ? m2(r3) : h2();
  }
  function o2(e3) {
    (t2.getConfig(`steps`) || [])[e3] ? m2(e3) : h2();
  }
  function s2() {
    if (t2.getState(`__transitionCallback`)) return;
    let e3 = t2.getState(`__activeStep`);
    if (!e3 || !(e3.advanceOnClick ?? t2.getConfig(`advanceOnClick`))) return;
    let n3 = t2.getState(`__activeElement`), r3 = L(t2, e3);
    if (r3) {
      r3(n3, e3, t2.getHookOpts());
      return;
    }
    i2();
  }
  function c2() {
    if (t2.getState(`__transitionCallback`)) return;
    let e3 = t2.getState(`activeIndex`), n3 = t2.getState(`__activeStep`), r3 = t2.getState(`__activeElement`);
    if (e3 === void 0 || n3 === void 0 || !(t2.getConfig(`steps`) || [])[e3 - 1]) return;
    let i3 = R(t2, n3);
    if (i3) return i3(r3, n3, t2.getHookOpts());
    a2();
  }
  function l2() {
    if (t2.getState(`__transitionCallback`)) return;
    let e3 = t2.getState(`activeIndex`), n3 = t2.getState(`__activeStep`), r3 = t2.getState(`__activeElement`);
    if (e3 === void 0 || n3 === void 0) return;
    let a3 = L(t2, n3);
    if (a3) return a3(r3, n3, t2.getHookOpts());
    i2();
  }
  function u2() {
    t2.getState(`isInitialized`) || (t2.setState(`isInitialized`, true), document.body.classList.add(`driver-active`, t2.getConfig(`animate`) ? `driver-fade` : `driver-simple`), t2.getConfig(`allowScroll`) || document.body.classList.add(`driver-no-scroll`), document.body.style.setProperty(`--driver-animation-duration`, `${t2.getConfig(`duration`) || 400}ms`), ee(t2), t2.listen(`overlayClick`, r2), t2.listen(`activeElementClick`, s2), t2.listen(`escapePress`, n2), t2.listen(`closeClick`, n2), t2.listen(`arrowLeftPress`, c2), t2.listen(`arrowRightPress`, l2));
  }
  function d2() {
    let e3 = t2.getState(`__pendingWaitCancel`);
    e3 && (t2.setState(`__pendingWaitCancel`, void 0), e3());
  }
  function p2(e3, n3, r3) {
    let i3 = () => {
      a3.disconnect(), window.clearTimeout(o3), t2.setState(`__pendingWaitCancel`, void 0), r3();
    }, a3 = new MutationObserver(() => {
      f$1(e3.element) && i3();
    }), o3 = window.setTimeout(i3, n3);
    t2.setState(`__pendingWaitCancel`, () => {
      a3.disconnect(), window.clearTimeout(o3);
    }), a3.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
  }
  function m2(e3 = 0, n3 = false) {
    d2();
    let r3 = t2.getConfig(`steps`);
    if (!r3) {
      console.error(`No steps to drive through`), h2();
      return;
    }
    if (!r3[e3]) {
      h2();
      return;
    }
    let i3 = r3[e3], a3 = i3.waitForElement ?? t2.getConfig(`waitForElement`) ?? 0;
    if (!n3 && a3 > 0 && i3.element && !f$1(i3.element)) {
      p2(i3, a3, () => m2(e3, true));
      return;
    }
    if (F(t2, i3)) {
      let n4 = t2.getState(`activeIndex`), i4 = typeof n4 == `number` && e3 < n4 ? -1 : 1;
      r3[e3 + i4] ? m2(e3 + i4) : i4 === 1 && h2();
      return;
    }
    t2.setState(`__activeOnDestroyed`, document.activeElement), t2.setState(`activeIndex`, e3);
    let o3 = r3[e3 + 1];
    K(t2, B(t2, e3, { onNextClick: () => {
      o3 ? m2(e3 + 1) : h2();
    }, onPrevClick: () => {
      m2(e3 - 1);
    }, onCloseClick: () => {
      h2();
    } }));
  }
  function h2(e3 = true) {
    let n3 = t2.getState(`__activeElement`), r3 = t2.getState(`__activeStep`), i3 = t2.getState(`__activeOnDestroyed`), a3 = t2.getConfig(`onDestroyStarted`);
    if (e3 && a3) {
      a3(!n3 || (n3 == null ? void 0 : n3.id) === `driver-dummy-element` ? void 0 : n3, r3, t2.getHookOpts());
      return;
    }
    let o3 = (r3 == null ? void 0 : r3.onDeselected) || t2.getConfig(`onDeselected`), s3 = t2.getConfig(`onDestroyed`);
    document.body.classList.remove(`driver-active`, `driver-fade`, `driver-simple`, `driver-no-scroll`), document.body.style.removeProperty(`--driver-animation-duration`), d2(), te(t2), w(t2.getState(`popover`)), Y(), N(t2), t2.resetEmitter();
    let c3 = t2.getState();
    if (t2.resetState(), n3 && r3) {
      let e4 = n3.id === `driver-dummy-element`;
      o3 && o3(e4 ? void 0 : n3, r3, t2.getHookOpts(c3)), s3 && s3(e4 ? void 0 : n3, r3, t2.getHookOpts(c3));
    }
    i3 && i3.focus();
  }
  let g2 = { isActive: () => t2.getState(`isInitialized`) || false, refresh: () => X(t2), drive: (e3 = 0) => {
    u2(), m2(e3);
  }, setConfig: t2.setConfig, setSteps: (e3) => {
    d2(), t2.resetState(), t2.setConfig({ ...t2.getConfig(), steps: e3 });
  }, getConfig: t2.getConfig, getState: t2.getState, getActiveIndex: () => t2.getState(`activeIndex`), isFirstStep: () => {
    let e3 = t2.getState(`activeIndex`);
    return e3 !== void 0 && I(t2, e3 - 1, -1) === void 0;
  }, isLastStep: () => {
    let e3 = t2.getState(`activeIndex`);
    return e3 !== void 0 && I(t2, e3 + 1, 1) === void 0;
  }, getActiveStep: () => t2.getState(`activeStep`), getActiveElement: () => t2.getState(`activeElement`), getPreviousElement: () => t2.getState(`previousElement`), getPreviousStep: () => t2.getState(`previousStep`), getNextStep: () => {
    let e3 = t2.getConfig(`steps`) || [], n3 = t2.getState(`activeIndex`);
    if (n3 === void 0) return;
    let r3 = I(t2, n3 + 1, 1);
    return r3 === void 0 ? void 0 : e3[r3];
  }, moveNext: i2, movePrevious: a2, moveTo: o2, hasNextStep: () => {
    let e3 = t2.getState(`activeIndex`);
    return e3 !== void 0 && I(t2, e3 + 1, 1) !== void 0;
  }, hasPreviousStep: () => {
    let e3 = t2.getState(`activeIndex`);
    return e3 !== void 0 && I(t2, e3 - 1, -1) !== void 0;
  }, highlight: (e3) => {
    u2(), K(t2, { ...e3, popover: e3.popover ? { showButtons: [], showProgress: false, progressText: ``, ...e3.popover } : void 0 });
  }, destroy: () => {
    h2(false);
  } };
  return t2.setDriver(g2), g2;
}
try {
  self["workbox:window:7.4.0"] && _();
} catch (n2) {
}
function n(n2, t2) {
  return new Promise((function(r2) {
    var e2 = new MessageChannel();
    e2.port1.onmessage = function(n3) {
      r2(n3.data);
    }, n2.postMessage(t2, [e2.port2]);
  }));
}
function t(n2, t2) {
  (null == t2 || t2 > n2.length) && (t2 = n2.length);
  for (var r2 = 0, e2 = Array(t2); r2 < t2; r2++) e2[r2] = n2[r2];
  return e2;
}
function r(n2, t2, r2) {
  return t2 && (function(n3, t3) {
    for (var r3 = 0; r3 < t3.length; r3++) {
      var e2 = t3[r3];
      e2.enumerable = e2.enumerable || false, e2.configurable = true, "value" in e2 && (e2.writable = true), Object.defineProperty(n3, o(e2.key), e2);
    }
  })(n2.prototype, t2), Object.defineProperty(n2, "prototype", { writable: false }), n2;
}
function e(n2, r2) {
  var e2 = "undefined" != typeof Symbol && n2[Symbol.iterator] || n2["@@iterator"];
  if (e2) return (e2 = e2.call(n2)).next.bind(e2);
  if (Array.isArray(n2) || (e2 = (function(n3, r3) {
    if (n3) {
      if ("string" == typeof n3) return t(n3, r3);
      var e3 = {}.toString.call(n3).slice(8, -1);
      return "Object" === e3 && n3.constructor && (e3 = n3.constructor.name), "Map" === e3 || "Set" === e3 ? Array.from(n3) : "Arguments" === e3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e3) ? t(n3, r3) : void 0;
    }
  })(n2)) || r2) {
    e2 && (n2 = e2);
    var i2 = 0;
    return function() {
      return i2 >= n2.length ? { done: true } : { done: false, value: n2[i2++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function i(n2, t2) {
  return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n3, t3) {
    return n3.__proto__ = t3, n3;
  }, i(n2, t2);
}
function o(n2) {
  var t2 = (function(n3, t3) {
    if ("object" != typeof n3 || !n3) return n3;
    var r2 = n3[Symbol.toPrimitive];
    if (void 0 !== r2) {
      var e2 = r2.call(n3, t3);
      if ("object" != typeof e2) return e2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(n3);
  })(n2, "string");
  return "symbol" == typeof t2 ? t2 : t2 + "";
}
try {
  self["workbox:core:7.4.0"] && _();
} catch (n2) {
}
var u = function() {
  var n2 = this;
  this.promise = new Promise((function(t2, r2) {
    n2.resolve = t2, n2.reject = r2;
  }));
};
function a(n2, t2) {
  var r2 = location.href;
  return new URL(n2, r2).href === new URL(t2, r2).href;
}
var c = function(n2, t2) {
  this.type = n2, Object.assign(this, t2);
};
function f(n2, t2, r2) {
  return n2 && n2.then || (n2 = Promise.resolve(n2)), t2 ? n2.then(t2) : n2;
}
function s() {
}
var v = { type: "SKIP_WAITING" };
function h(n2, t2) {
  return n2 && n2.then ? n2.then(s) : Promise.resolve();
}
var l = (function(t2) {
  function e2(n2, r2) {
    var e3, i2;
    return void 0 === r2 && (r2 = {}), (e3 = t2.call(this) || this).nn = {}, e3.tn = 0, e3.rn = new u(), e3.en = new u(), e3.on = new u(), e3.un = 0, e3.an = /* @__PURE__ */ new Set(), e3.cn = function() {
      var n3 = e3.fn, t3 = n3.installing;
      e3.tn > 0 || !a(t3.scriptURL, e3.sn.toString()) || performance.now() > e3.un + 6e4 ? (e3.vn = t3, n3.removeEventListener("updatefound", e3.cn)) : (e3.hn = t3, e3.an.add(t3), e3.rn.resolve(t3)), ++e3.tn, t3.addEventListener("statechange", e3.ln);
    }, e3.ln = function(n3) {
      var t3 = e3.fn, r3 = n3.target, i3 = r3.state, o3 = r3 === e3.vn, u2 = { sw: r3, isExternal: o3, originalEvent: n3 };
      !o3 && e3.mn && (u2.isUpdate = true), e3.dispatchEvent(new c(i3, u2)), "installed" === i3 ? e3.wn = self.setTimeout((function() {
        "installed" === i3 && t3.waiting === r3 && e3.dispatchEvent(new c("waiting", u2));
      }), 200) : "activating" === i3 && (clearTimeout(e3.wn), o3 || e3.en.resolve(r3));
    }, e3.yn = function(n3) {
      var t3 = e3.hn, r3 = t3 !== navigator.serviceWorker.controller;
      e3.dispatchEvent(new c("controlling", { isExternal: r3, originalEvent: n3, sw: t3, isUpdate: e3.mn })), r3 || e3.on.resolve(t3);
    }, e3.gn = (i2 = function(n3) {
      var t3 = n3.data, r3 = n3.ports, i3 = n3.source;
      return f(e3.getSW(), (function() {
        e3.an.has(i3) && e3.dispatchEvent(new c("message", { data: t3, originalEvent: n3, ports: r3, sw: i3 }));
      }));
    }, function() {
      for (var n3 = [], t3 = 0; t3 < arguments.length; t3++) n3[t3] = arguments[t3];
      try {
        return Promise.resolve(i2.apply(this, n3));
      } catch (n4) {
        return Promise.reject(n4);
      }
    }), e3.sn = n2, e3.nn = r2, navigator.serviceWorker.addEventListener("message", e3.gn), e3;
  }
  var o2, s2;
  s2 = t2, (o2 = e2).prototype = Object.create(s2.prototype), o2.prototype.constructor = o2, i(o2, s2);
  var l2 = e2.prototype;
  return l2.register = function(n2) {
    var t3 = (void 0 === n2 ? {} : n2).immediate, r2 = void 0 !== t3 && t3;
    try {
      var e3 = this;
      return f((function(n3, t4) {
        var r3 = n3();
        if (r3 && r3.then) return r3.then(t4);
        return t4(r3);
      })((function() {
        if (!r2 && "complete" !== document.readyState) return h(new Promise((function(n3) {
          return window.addEventListener("load", n3);
        })));
      }), (function() {
        return e3.mn = Boolean(navigator.serviceWorker.controller), e3.dn = e3.pn(), f(e3.bn(), (function(n3) {
          e3.fn = n3, e3.dn && (e3.hn = e3.dn, e3.en.resolve(e3.dn), e3.on.resolve(e3.dn), e3.dn.addEventListener("statechange", e3.ln, { once: true }));
          var t4 = e3.fn.waiting;
          return t4 && a(t4.scriptURL, e3.sn.toString()) && (e3.hn = t4, Promise.resolve().then((function() {
            e3.dispatchEvent(new c("waiting", { sw: t4, wasWaitingBeforeRegister: true }));
          })).then((function() {
          }))), e3.hn && (e3.rn.resolve(e3.hn), e3.an.add(e3.hn)), e3.fn.addEventListener("updatefound", e3.cn), navigator.serviceWorker.addEventListener("controllerchange", e3.yn), e3.fn;
        }));
      })));
    } catch (n3) {
      return Promise.reject(n3);
    }
  }, l2.update = function() {
    try {
      return this.fn ? f(h(this.fn.update())) : f();
    } catch (n2) {
      return Promise.reject(n2);
    }
  }, l2.getSW = function() {
    return void 0 !== this.hn ? Promise.resolve(this.hn) : this.rn.promise;
  }, l2.messageSW = function(t3) {
    try {
      return f(this.getSW(), (function(r2) {
        return n(r2, t3);
      }));
    } catch (n2) {
      return Promise.reject(n2);
    }
  }, l2.messageSkipWaiting = function() {
    this.fn && this.fn.waiting && n(this.fn.waiting, v);
  }, l2.pn = function() {
    var n2 = navigator.serviceWorker.controller;
    return n2 && a(n2.scriptURL, this.sn.toString()) ? n2 : void 0;
  }, l2.bn = function() {
    try {
      var n2 = this;
      return f((function(n3, t3) {
        try {
          var r2 = n3();
        } catch (n4) {
          return t3(n4);
        }
        if (r2 && r2.then) return r2.then(void 0, t3);
        return r2;
      })((function() {
        return f(navigator.serviceWorker.register(n2.sn, n2.nn), (function(t3) {
          return n2.un = performance.now(), t3;
        }));
      }), (function(n3) {
        throw n3;
      })));
    } catch (n3) {
      return Promise.reject(n3);
    }
  }, r(e2, [{ key: "active", get: function() {
    return this.en.promise;
  } }, { key: "controlling", get: function() {
    return this.on.promise;
  } }]);
})((function() {
  function n2() {
    this.Pn = /* @__PURE__ */ new Map();
  }
  var t2 = n2.prototype;
  return t2.addEventListener = function(n3, t3) {
    this.jn(n3).add(t3);
  }, t2.removeEventListener = function(n3, t3) {
    this.jn(n3).delete(t3);
  }, t2.dispatchEvent = function(n3) {
    n3.target = this;
    for (var t3, r2 = e(this.jn(n3.type)); !(t3 = r2()).done; ) {
      (0, t3.value)(n3);
    }
  }, t2.jn = function(n3) {
    return this.Pn.has(n3) || this.Pn.set(n3, /* @__PURE__ */ new Set()), this.Pn.get(n3);
  }, n2;
})());
const workboxWindow_prod_es5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Workbox: l,
  WorkboxEvent: c,
  messageSW: n
}, Symbol.toStringTag, { value: "Module" }));
export {
  create as a,
  oe as b,
  clsx as c,
  openDB as o,
  twMerge as t,
  workboxWindow_prod_es5 as w
};
