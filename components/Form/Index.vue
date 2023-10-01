<template>
    <UForm
        :state="form"
        @submit.prevent="submitForm()"
    >
    <div class="flex flex-row">
        <div class="p-1 basis-1/3">
            <UFormGroup label="Nome completo" name="name">
                <UInput 
                    v-model="form.name" 
                    @blur="errorByBlur('name')" 
                />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
        <div class="p-1 basis-1/3">
            <UFormGroup label="Data de nascimento" name="dateBirth">
                <UInput 
                    v-model="form.dateBirth" 
                    type="date"
                    min="1958-09-29"
                    max="2005-09-29"
                />
            </UFormGroup>
        </div>
        <div class="p-1 basis-1/3">
            <UFormGroup label="CPF" name="cpf">
                <UInput 
                    v-model="form.cpf" 
                    v-maska:[maskCPF] 
                    @blur="errorByBlur('cpf')"
                    placeholder="###.###.###-##"
                />
                <div class="input-errors" v-for="error of v$.cpf.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
    </div>

    <div class="flex flex-row">
        <div class="p-1 basis-1/3">
            <UFormGroup label="Espécie do pet" name="pet">
                <USelect 
                    v-model="form.pet" 
                    :options="pets.listPet" 
                />
            </UFormGroup>
        </div>
        <div class="p-1 basis-1/3">
            <UFormGroup label="Raça do pet" name="petBreed">
                <USelect 
                    placeholder="Selecione..." 
                    v-model="form.petBreed" 
                    :options="form.pet == 'Cão' ? pets.listPetDogBreed : pets.listPetCatBreed"
                    @blur="errorByBlur('petBreed')"
                />
                <div class="input-errors" v-for="error of v$.petBreed.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
        <div class="p-1 basis-1/3" v-if="form.petBreed == 'Outro'">
            <UFormGroup label="Outro" name="other">
                <UInput 
                    v-model="form.other"
                    @blur="errorByBlur('other')"
                />
                <div class="input-errors" v-for="error of v$.other.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>

        <div class="p-1 basis-2/4">
            <UFormGroup label="Renda mensal" name="amount">
                <VCurrencyInput
                    v-model="form.amount"
                    :options="{ currency: 'BRL' }" 
                    @blur="errorByBlur('amount')" 
                />
                <div class="input-errors" v-for="error of v$.amount.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>

        <div class="p-1 basis-2/4">
            <UFormGroup label="CEP" name="cep">
                <UInput 
                    v-model="form.cep"
                    placeholder="#####-###"
                    v-maska:[maskCEP]
                    @blur="getCep(form.cep)"                   
                 />
                <div class="input-errors" v-for="error of v$.cep.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
    </div>

    <div class="flex flex-row">
        <div class="p-1 basis-1/4">
            <UFormGroup label="Rua" name="street">
                <UInput 
                    v-model="form.street"
                    @blur="errorByBlur('street')" 
                />
                <div class="input-errors" v-for="error of v$.street.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
        <div class="p-1 basis-1/4">
            <UFormGroup label="Bairro" name="neighborhood">
                <UInput 
                    v-model="form.neighborhood"
                    @blur="errorByBlur('neighborhood')" 
                />
                <div class="input-errors" v-for="error of v$.neighborhood.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
        <div class="p-1 basis-1/4">
            <UFormGroup label="Estado" name="state">
                <USelect 
                    v-model="form.state"
                    @blur="errorByBlur('state')" 
                    :options="listState" 
                />
                <div class="input-errors" v-for="error of v$.state.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
        <div class="p-1 basis-1/4">
            <UFormGroup label="Cidade" name="city">
                <UInput 
                    v-model="form.city"
                    @blur="errorByBlur('city')" 
                />
                <div class="input-errors" v-for="error of v$.city.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </UFormGroup>
        </div>
    </div>

    <UButton type="submit" class="mt-3">
        Enviar
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
    import { cpfMask, cepMask } from '@/composables/mask'
    import { vMaska } from "maska"
    import ValidationsInput from '@/composables/validations'
    import { useVuelidate } from '@vuelidate/core'
    import { ref, watch } from 'vue'
    import CepService from '~/services/cep'

    const maskCPF = cpfMask
    const maskCEP = cepMask

    const listState = ref([ 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',])

    const pets = ref({
        listPet: [
            'Cão',
            'Gato'
        ],

        listPetDogBreed: [
            'Buldogue',
            'Dachshund',
            'Pastor Alemão',
            'Poodle',
            'Rottweiler',
            'Labrador',
            'Outro'
        ],

        listPetCatBreed: [
            'Ashera',
            'Siamês',
            'Angorá',
            'American Shorthair',
            'Persa',
            'Maine Coon',
            'Outro'
        ]
    })

    const form = ref({
        dateBirth: undefined,
        name: undefined,
        cpf: undefined,
        pet: 'Cão',
        petBreed: undefined,
        other: undefined,
        amount: '',
        cep: undefined,
        street: undefined,
        city: undefined,
        state: undefined,
        neighborhood: undefined
    })

    watch(() => form.value.petBreed, (value) => {
        if(value == 'Outro'){
            rules.value.other = ValidationsInput.RequiredIf('Campo obrigatorio', form.value.petBreed == 'Outro')
        } else {
            form.value.other = undefined
            rules.value.other = {}
        }
        v$ = useVuelidate(rules, form, { $lazy: true })
    })


    const rules = ref({
        name: {
            ...ValidationsInput.Required('Campo nome é obrigatorio'),
            ...ValidationsInput.AtLeastTwoWords('Campo nome precisa ser composto por nome e sobrenome')
        },
        cpf: {
            ...ValidationsInput.MinLength('CPF deve ter ao menos 11 digitos', 14),
            ...ValidationsInput.Required('CPF é obrigatorio'),
        },
        pet: ValidationsInput.Required('Campo "Espécie do pet" é obrigatorio'),
        petBreed: ValidationsInput.Required('Campo "Raça do pet" é obrigatorio'),
        cep: ValidationsInput.Required('Campo CEP é obrigatorio'),
        street: ValidationsInput.Required('Campo Rua é obrigatorio'),
        city: ValidationsInput.Required('Campo Cidade é obrigatorio'),
        state: ValidationsInput.Required('Campo Estado é obrigatorio'),
        neighborhood: ValidationsInput.Required('Campo Bairro é obrigatorio'),
        amount: ValidationsInput.MinValue('Valor não pode ser menor que R$ 1000', 1000),
        other: {}
    })

    let v$ = useVuelidate(rules, form, { $lazy: true })

    const emits = defineEmits(['successForm'])

    async function getCep(cep: any): Promise<void>{
        errorByBlur('cep')
        if(!cep){
            return
        }
        const data: any = await CepService.getCep(cep)
        form.value.street = data.logradouro
        form.value.neighborhood = data.bairro
        form.value.city = data.localidade
        form.value.state = data.uf

        return 
    }

    function errorByBlur(field: string): void{
        return ValidationsInput.handleBlur(v$, field)
    }

    function submitForm(): void{
        v$.value.$touch()

        if (v$.value.$invalid) {
            return
        }

        emits('successForm', form.value)
    }
</script>

<style scoped>
    .error-msg {
        color: rgb(255, 0, 0);
        font-size: 12px;
    }
</style>