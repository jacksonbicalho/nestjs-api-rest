import { validate } from "class-validator";

function Valid(dto: Object | any) {
  return function (_target, _key: string, descriptor: PropertyDescriptor) {

    var originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {

      const obj = Object.assign(new dto(), args[0]);
      const errors = await validate(obj);

      if (errors.length > 0) {
        return errors;
      }
      return originalMethod.apply(this, args);
    }
    return descriptor;
  }
};
export default Valid;