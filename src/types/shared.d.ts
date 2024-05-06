import { ANY } from "/src/consts.js";
export {
  JutSuperTypeFilter,
  JutSuperTypeDeepPartial
};


type JutSuperTypeFilter<T> = {
  [Key in keyof T]: T[Key] extends Record<any, any> ?
    JutSuperTypeFilter<T[Key]> | typeof ANY :
    T[Key] | typeof ANY
};
type JutSuperTypeDeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends Record<any, any> ?
  JutSuperTypeDeepPartial<T[Key]> :
  T[Key]
};
