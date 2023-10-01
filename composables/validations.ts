import { required, minLength, helpers, requiredIf, minValue} from '@vuelidate/validators'

class ValidationsInput {
    public Required(message: string): object{
        return {
            required: helpers.withMessage(message, required),
        }
    }

    public RequiredIf(message: string, validate: any): object{
        return {
            requiredIfRef: helpers.withMessage(message, requiredIf(validate)),
        }
    }

    public MinValue(message: string, minimum: number): object{
        return {
            minValue: helpers.withMessage(message, minValue(minimum))
        }
    }

    public MinLength(message: string, minimum: number): object{
        return {
            minLength: helpers.withMessage(message, minLength(minimum))
        }
    }

    public AtLeastTwoWords(message: string): object {
        return {
          atLeastTwoWords: helpers.withMessage(message, (value: string) => {
            const words = value.trim().split(/\s+/);
            return words.length >= 2;
          }),
        };
    }

    public handleBlur(v$: any, field: string): void{
        v$.value[field].$touch()
    };
}

export default new ValidationsInput()