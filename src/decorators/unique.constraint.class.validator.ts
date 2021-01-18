import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from "class-validator";
import { getRepository } from "typeorm";

export function getNameEntity(targetName: string){
    return targetName
        .replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')[1];
}

@ValidatorConstraint({async: true})
export class UniqueConstraint implements ValidatorConstraintInterface {

    async validate(value: any, args: ValidationArguments) {
        const repository = getRepository(getNameEntity(args.targetName));
        const field =  args.property
        const user = await repository.findOne({ [field]: value });
        if (user) return false
        return true
    }
    public defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `$property already registered`;
    }

}

export function Unique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueConstraint
        });
    };
}
