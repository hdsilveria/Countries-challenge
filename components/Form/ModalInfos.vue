<template>
    <ul class="p-3">
        <li>
            <b>Nome: </b>{{ infos.name }}
        </li>
        <li>
            <b>Data de nascimento: </b>{{ infos.dateBirth }}
        </li>
        <li>
            <b>cpf: </b>{{ infos.cpf }}
        </li>
        <li>
            <b>Espécie do pet: </b>{{ infos.pet }}
        </li>
        <li>
            <b>Raça do pet: </b>{{ infos.petBreed == "Outro" ? infos.other :  infos.petBreed}}
        </li>
        <li>
            <b>Renda Mensal: </b>{{ infos.amount}}
        </li>
        <li>
            <b>Cep: </b>{{ infos.cep}}
        </li>
        <li>
            <b>Rua: </b>{{ infos.street}}
        </li>
        <li>
            <b>Cidade: </b>{{ infos.city }}
        </li>
        <li>
            <b>Estado: </b>{{ infos.state }}
        </li>
        <li>
            <b>Bairro: </b>{{ infos.neighborhood }}
        </li>
    </ul>
</template>

<script setup lang="ts">
    import { PropType } from 'vue';
    import { IForm } from '~/models/Form'

    defineProps({
        infos: {
            type: Object as PropType<IForm>,
            required: true,
        }
    })
</script>